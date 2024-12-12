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
const reset_token_schema_1 = require("./schemas/reset-token.schema");
const roles_service_1 = require("../roles/roles.service");
let AuthService = class AuthService {
    constructor(UserModel, RefreshTokenModel, ResetTokenModel, jwtService, rolesService) {
        this.UserModel = UserModel;
        this.RefreshTokenModel = RefreshTokenModel;
        this.ResetTokenModel = ResetTokenModel;
        this.jwtService = jwtService;
        this.rolesService = rolesService;
    }
    async getAllUsers() {
        return this.UserModel.find().exec();
    }
    async findByEmail(email) {
        return this.UserModel.findOne({ email }).exec();
    }
    async findUserByField(field, value) {
        const query = { [field]: value };
        const user = await this.UserModel.findOne(query).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with ${field} "${value}" not found`);
        }
        return user;
    }
    async signup(signupData) {
        const { username, email, password, bio, imageUri } = signupData;
        const emailInUse = await this.UserModel.findOne({ email });
        if (emailInUse) {
            throw new common_1.BadRequestException('Email already in use');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await this.UserModel.create({
                username,
                email,
                password: hashedPassword,
                bio,
                imageUri,
            });
            return {
                success: true,
                message: 'User created successfully',
                user: {
                    username: newUser.username,
                    email: newUser.email,
                    bio: newUser.bio,
                    imageUri: newUser.imageUri,
                    _id: newUser._id,
                },
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating user');
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
    async changePassword(changePasswordDto) {
        const { email, newPassword } = changePasswordDto;
        const user = await this.UserModel.findOne({ email }).exec();
        if (!user) {
            throw new Error('User not found');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        console.log('tbadil pass');
        return { message: 'Password changed successfully' };
    }
    async updateProfile(email, updateData) {
        const user = await this.UserModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateData.username)
            user.username = updateData.username;
        if (updateData.bio)
            user.bio = updateData.bio;
        if (updateData.imageUri)
            user.imageUri = updateData.imageUri;
        if (updateData.password) {
            user.password = await bcrypt.hash(updateData.password, 10);
        }
        try {
            await user.save();
            return { success: true, message: 'Profile updated successfully', user };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating profile');
        }
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
        roles_service_1.RolesService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=User.service.js.map