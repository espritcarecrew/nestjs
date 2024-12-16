import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schemas/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { RolesService } from 'src/roles/roles.service';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { UpdateProfileDto } from './dtos/UpdateProfileDto.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    @InjectModel(ResetToken.name)
    private ResetTokenModel: Model<ResetToken>,
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}
  async getAllUsers() {
    return this.UserModel.find().exec();
}
  // Define the findByEmail method in UserService
  async findByEmail(email: string): Promise<User | null> {
    return this.UserModel.findOne({ email }).exec(); // Use Mongoose findOne to find user by email
  }
async findUserByField(field: string, value: string): Promise<User> {
  const query = { [field]: value };
  const user = await this.UserModel.findOne(query).exec();

  if (!user) {
    throw new NotFoundException(`User with ${field} "${value}" not found`);
  }

  return user;
}


async signup(signupData: SignupDto) {
  const { username, email, password, bio, imageUri } = signupData;

  const emailInUse = await this.UserModel.findOne({ email });
  if (emailInUse) {
    throw new BadRequestException('Email already in use');
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
  } catch (error) {
    throw new InternalServerErrorException('Error creating user');
  }
}


  async login(credentials: LoginDto) {
    const { email, password } = credentials;

    // Log de la tentative de connexion
    console.log('Tentative de connexion pour l\'email:', email);

    const user = await this.UserModel.findOne({ email });
    if (!user) {
      console.log('Erreur : Mauvais identifiants (email non trouvé)');
      throw new UnauthorizedException('Wrong credentials');
    }

    // Vérification du mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Erreur : Mauvais identifiants (mot de passe incorrect)');
      throw new UnauthorizedException('Wrong credentials');
    }

    // Génération des tokens
    const tokens = await this.generateUserTokens(user._id);
    console.log('Tokens générés avec succès :', tokens);

    return {
      ...tokens,
      userId: user._id,
    };
  }
  async resetPassword(newPassword: string, resetToken: string) {
    const token = await this.ResetTokenModel.findOneAndDelete({
      token: resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      console.log('Erreur : Lien de réinitialisation invalide');
      throw new UnauthorizedException('Invalid link');
    }

    const user = await this.UserModel.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    console.log('Mot de passe réinitialisé avec succès');
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOne({
      token: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      console.log('Erreur : Token de rafraîchissement invalide');
      throw new UnauthorizedException('Refresh Token is invalid');
    }
    return this.generateUserTokens(token.userId);
  }

  async generateUserTokens(userId) {
    const accessToken = this.jwtService.sign({ userId }, { expiresIn: '24h' });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(refreshToken, userId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.updateOne(
      { userId },
      { $set: { expiryDate, token } },
      {
        upsert: true,
      },
    );
    console.log('Token de rafraîchissement stocké');
  }

  async getUserPermissions(userId: string) {
    const user = await this.UserModel.findById(userId);

    if (!user) throw new BadRequestException();

    const role = await this.rolesService.getRoleById(user.roleId.toString());
    return role.permissions;
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<any> {
    const { email, newPassword } = changePasswordDto;

    // Find the user by email
    const user = await this.UserModel.findOne({ email }).exec(); // Directly query using findOne

    if (!user) {
      throw new Error('User not found'); // Or throw a specific HTTP exception
      
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;

    // Save the updated user record
    await user.save();
    console.log('tbadil pass');

    return { message: 'Password changed successfully' };
  }
  async updateProfile(email: string, updateData: any): Promise<any> {
    // Find the user by email
    const user = await this.UserModel.findOne({ email }).exec();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Update user fields based on the input
    if (updateData.username) user.username = updateData.username;
    if (updateData.bio) user.bio = updateData.bio;
    if (updateData.imageUri) user.imageUri = updateData.imageUri;

    if (updateData.password) {
      // If password is being updated, hash it
      user.password = await bcrypt.hash(updateData.password, 10);
    }
    try {
      await user.save();  // Save the updated user
      return { success: true, message: 'Profile updated successfully', user };
    } catch (error) {
      throw new InternalServerErrorException('Error updating profile');
    }
  }
}
