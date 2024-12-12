import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
    controllers: [MailerController], // Add the MailerController
    providers: [MailerService],      // Add the MailerService
    exports: [MailerService],        // Export MailerService if needed elsewhere
  })
  export class MailerModule {}
