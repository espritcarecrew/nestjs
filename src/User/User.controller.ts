import { Body, Controller, Post, Put, Get, UseGuards, Query, Req } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refresh-tokens.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { AuthService } from './User.service';
import { UpdateProfileDto } from './dtos/UpdateProfileDto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signupData: SignupDto) {
    return this.authService.signup(signupData);
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }

  @Put('reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(
      resetPasswordDto.newPassword,
      resetPasswordDto.resetToken,
    );
  }
  @Get('users') // New method to fetch all users
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

@Get('find')
async findUser(@Query('field') field: string, @Query('value') value: string) {
    console.log(`Received query: field=${field}, value=${value}`);
    if (!field || !value) {
        throw new Error('Both "field" and "value" query parameters are required');
    }
    return this.authService.findUserByField(field, value);
}
@Put('change-password')
async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<any> {
  return this.authService.changePassword(changePasswordDto);
}
@Put('update-profile')
async updateProfile(@Body() updateData: UpdateProfileDto) {
  const { email, username, bio } = updateData;

  return await this.authService.updateProfile(email, { username, bio });
}
}
