import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { ResetToken } from './schemas/reset-token.schema';
import { MailService } from 'src/services/mail.service';
import { RolesService } from 'src/roles/roles.service';
export declare class AuthService {
    private UserModel;
    private RefreshTokenModel;
    private ResetTokenModel;
    private jwtService;
    private mailService;
    private rolesService;
    constructor(UserModel: Model<User>, RefreshTokenModel: Model<RefreshToken>, ResetTokenModel: Model<ResetToken>, jwtService: JwtService, mailService: MailService, rolesService: RolesService);
    signup(signupData: SignupDto): Promise<mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    login(credentials: LoginDto): Promise<{
        userId: unknown;
        accessToken: string;
        refreshToken: any;
    }>;
    changePassword(userId: any, oldPassword: string, newPassword: string): Promise<void>;
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(newPassword: string, resetToken: string): Promise<void>;
    refreshTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    generateUserTokens(userId: any): Promise<{
        accessToken: string;
        refreshToken: any;
    }>;
    storeRefreshToken(token: string, userId: string): Promise<void>;
    getUserPermissions(userId: string): Promise<{
        resource: import("../roles/enums/resource.enum").Resource;
        actions: import("../roles/enums/action.enum").Action[];
    }[]>;
}
