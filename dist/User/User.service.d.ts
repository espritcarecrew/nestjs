import { SignupDto } from './dtos/signup.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { ResetToken } from './schemas/reset-token.schema';
import { RolesService } from 'src/roles/roles.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
export declare class AuthService {
    private UserModel;
    private RefreshTokenModel;
    private ResetTokenModel;
    private jwtService;
    private rolesService;
    constructor(UserModel: Model<User>, RefreshTokenModel: Model<RefreshToken>, ResetTokenModel: Model<ResetToken>, jwtService: JwtService, rolesService: RolesService);
    getAllUsers(): Promise<(mongoose.Document<unknown, {}, User> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findByEmail(email: string): Promise<User | null>;
    findUserByField(field: string, value: string): Promise<User>;
    signup(signupData: SignupDto): Promise<{
        success: boolean;
        message: string;
        user: {
            username: string;
            email: string;
            bio: string;
            imageUri: string;
            _id: unknown;
        };
    }>;
    login(credentials: LoginDto): Promise<{
        userId: unknown;
        accessToken: string;
        refreshToken: any;
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
    changePassword(changePasswordDto: ChangePasswordDto): Promise<any>;
    updateProfile(email: string, updateData: any): Promise<any>;
}
