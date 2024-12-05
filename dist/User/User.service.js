"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const refresh_token_schema_1 = require("./schemas/refresh-token.schema");
const uuid_1 = require("uuid");
const nanoid_1 = require("nanoid");
const reset_token_schema_1 = require("./schemas/reset-token.schema");
const mail_service_1 = require("../services/mail.service");
const roles_service_1 = require("../roles/roles.service");
let AuthService = class AuthService {
    constructor(UserModel, RefreshTokenModel, ResetTokenModel, jwtService, mailService, rolesService) {
        this.UserModel = UserModel;
        this.RefreshTokenModel = RefreshTokenModel;
        this.ResetTokenModel = ResetTokenModel;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.rolesService = rolesService;
    }
    async signup(signupData) {
        const { username, email, password, bio, imageUri } = signupData;
        console.log('Données d\'inscription reçues :', signupData);
        console.log('Vérification de l\'email...');
        const emailInUse = await this.UserModel.findOne({ email });
        if (emailInUse) {
            console.log('Erreur : L\'email est déjà utilisé.');
            throw new common_1.BadRequestException('Email already in use');
        }
        console.log('Création du mot de passe haché...');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Mot de passe haché :', hashedPassword);
        try {
            console.log('Création de l\'utilisateur...');
            const newUser = await this.UserModel.create({
                username,
                email,
                password: hashedPassword,
                bio,
                imageUri,
            });
            console.log('Utilisateur créé avec succès :', newUser);
            return newUser;
        }
        catch (error) {
            console.log('Erreur lors de la création de l\'utilisateur:', error);
            throw new common_1.InternalServerErrorException('Erreur lors de la création de l\'utilisateur');
        }
    }
    async login(credentials) {
        const { email, password } = credentials;
        console.log('Tentative de connexion pour l\'email:', email);
        const user = await this.UserModel.findOne({ email });
        if (!user) {
            console.log('Erreur : Mauvais identifiants (email non trouvé)');
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.log('Erreur : Mauvais identifiants (mot de passe incorrect)');
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        const tokens = await this.generateUserTokens(user._id);
        console.log('Tokens générés avec succès :', tokens);
        return Object.assign(Object.assign({}, tokens), { userId: user._id });
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.UserModel.findById(userId);
        if (!user) {
            console.log('Erreur : Utilisateur non trouvé');
            throw new common_1.NotFoundException('User not found...');
        }
        const passwordMatch = await bcrypt.compare(oldPassword, user.password);
        if (!passwordMatch) {
            console.log('Erreur : Mauvais identifiants (ancien mot de passe incorrect)');
            throw new common_1.UnauthorizedException('Wrong credentials');
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        await user.save();
        console.log('Mot de passe changé avec succès');
    }
    async forgotPassword(email) {
        const user = await this.UserModel.findOne({ email });
        if (user) {
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);
            const resetToken = (0, nanoid_1.nanoid)(64);
            await this.ResetTokenModel.create({
                token: resetToken,
                userId: user._id,
                expiryDate,
            });
            this.mailService.sendPasswordResetEmail(email, resetToken);
            console.log('Email de réinitialisation envoyé');
        }
        return { message: 'If this user exists, they will receive an email' };
    }
    async resetPassword(newPassword, resetToken) {
        const token = await this.ResetTokenModel.findOneAndDelete({
            token: resetToken,
            expiryDate: { $gte: new Date() },
        });
        if (!token) {
            console.log('Erreur : Lien de réinitialisation invalide');
            throw new common_1.UnauthorizedException('Invalid link');
        }
        const user = await this.UserModel.findById(token.userId);
        if (!user) {
            throw new common_1.InternalServerErrorException();
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        console.log('Mot de passe réinitialisé avec succès');
    }
    async refreshTokens(refreshToken) {
        const token = await this.RefreshTokenModel.findOne({
            token: refreshToken,
            expiryDate: { $gte: new Date() },
        });
        if (!token) {
            console.log('Erreur : Token de rafraîchissement invalide');
            throw new common_1.UnauthorizedException('Refresh Token is invalid');
        }
        return this.generateUserTokens(token.userId);
    }
    async generateUserTokens(userId) {
        const accessToken = this.jwtService.sign({ userId }, { expiresIn: '24h' });
        const refreshToken = (0, uuid_1.v4)();
        await this.storeRefreshToken(refreshToken, userId);
        return {
            accessToken,
            refreshToken,
        };
    }
    async storeRefreshToken(token, userId) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);
        await this.RefreshTokenModel.updateOne({ userId }, { $set: { expiryDate, token } }, {
            upsert: true,
        });
        console.log('Token de rafraîchissement stocké');
    }
    async getUserPermissions(userId) {
        const user = await this.UserModel.findById(userId);
        if (!user)
            throw new common_1.BadRequestException();
        const role = await this.rolesService.getRoleById(user.roleId.toString());
        return role.permissions;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(refresh_token_schema_1.RefreshToken.name)),
    __param(2, (0, mongoose_1.InjectModel)(reset_token_schema_1.ResetToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService,
        mail_service_1.MailService,
        roles_service_1.RolesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=User.service.js.map