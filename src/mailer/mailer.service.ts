import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;
  private verificationCodes: Map<string, string> = new Map(); // Temporary in-memory store

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Replace with your SMTP host
      port: 587, // SMTP port (e.g., 587 for TLS)
      secure: false, // Set to true if using SSL (port 465)
      auth: {
        user: 'karimchecambou123@gmail.com', // Replace with your email
        pass: 'ozbi azcu fdfr mkon', // Replace with your email password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string): Promise<void> {
    const mailOptions = {
      from: '"Your App" <karimchecambou123@gmail.com>', // Replace with your sender email
      to, // Receiver email
      subject, // Subject line
      text, // Plain text body
      html, // Optional HTML body
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error.message);
      console.error('SMTP Error Details:', error); // Log the full error
      throw new Error('Unable to send email');
    }
  }
  private generateRandomCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async sendVerificationCode(to: string): Promise<void> {
    const code = this.generateRandomCode(); // Generate the 6-digit code
    this.verificationCodes.set(to, code); // Store the code in-memory, keyed by email

    const mailOptions = {
      from: '"Your App Name" <your-email@gmail.com>',
      to,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f9f9f9; padding: 20px;">
          <h2 style="color: #4caf50;">Your Verification Code</h2>
          <p style="font-size: 16px; color: #333;">
            Use the code below to complete your verification process. This code is valid for 10 minutes.
          </p>
          <div style="font-size: 24px; font-weight: bold; color: #4caf50; margin: 20px 0;">
            ${code}
          </div>
          <p style="font-size: 14px; color: #888;">
            If you did not request this code, please ignore this email.
          </p>
        </div>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Verification code sent to ${to}`);
    } catch (error) {
      console.error('Error sending verification code:', error.message);
      throw new Error('Unable to send verification code');
    }
  }

  getCodeForEmail(email: string): string | null {
    return this.verificationCodes.get(email) || null;
  }

  verifyCode(email: string, code: string): boolean {
    const storedCode = this.verificationCodes.get(email);

    if (storedCode && storedCode === code) {
        console.log(`Verification successful for email: ${email}`);
        this.verificationCodes.delete(email); // Remove the code after successful verification
        return true;
    } else {
        console.log(`Verification failed for email: ${email}. Incorrect or expired code.`);
        return false;
    }
}
}
  

