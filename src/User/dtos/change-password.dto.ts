import { IsEmail, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsEmail()
  email: string;  // Ensure email is a valid string and an email format

  @IsString()
  @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters.' })
  newPassword: string; // Make sure the password is a string and meets length requirements
}
