import { Controller, Post, Body } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mail')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {
    console.log('MailerController initialized');
  }

  @Post('send')
  async sendMail(@Body() body: { to: string; subject: string; text: string; html?: string }): Promise<string> {
    const { to, subject, text, html } = body;
    await this.mailerService.sendMail(to, subject, text, html);
    return 'Email sent successfully';
  }
  @Post('send-code') 
  async sendVerificationCode(@Body('email') email: string): Promise<string> {
    try {
      await this.mailerService.sendVerificationCode(email);
      return 'Verification code sent successfully';
    } catch (error) {
      console.error('Error in sendVerificationCode:', error.message);
      throw new Error('Failed to send verification code');
    }
  }

  @Post('verify-code')
  async verifyCode(
    @Body('email') email: string,
    @Body('code') code: string,
  ): Promise<{ success: boolean; message: string }> {
    const isValid = this.mailerService.verifyCode(email, code);
    if (isValid) {
      return { success: true, message: 'Code verified successfully' };
    }
    return { success: false, message: 'Invalid or expired code' };
  }
}
