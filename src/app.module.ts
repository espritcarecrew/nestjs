import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './User/User.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { DailyCheckinModule } from './daily-checkin/daily-checkin.module';
import { ToDoModule } from './todo/todo.module';
import { ChecklistService } from './checklist/checklist.service';
import { ChecklistController } from './checklist/checklist.controller';
import { ChecklistModule } from './checklist/checklist.module';
import { DoctorService } from './doctor/doctor.service';
import { DoctorController } from './doctor/doctor.controller';
import { ConsultationScheduleModule } from './consultation-schedule/consultation-schedule.module';
import { ConsultationScheduleController } from './consultation-schedule/consultation-schedule.controller';
import { DoctorModule } from './doctor/doctor.module';
import { CategoryService } from './category/category.service';
import { CategoryController } from './category/category.controller';
import { CategoryModule } from './category/category.module';
import { ConsultationScheduleService } from './consultation-schedule/consultation-schedule.service';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentModule } from './appointment/appointment.module';
import config from './config/config';
import { MailerModule } from './mailer/mailer.module';
import { GeminiModule } from './gemini/gemini.module';
import { MoodModule } from './mood/mood.module';
import { PredictionModule } from './prediction/prediction.module';
import { VaccinationModule } from './vaccination/vaccination.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        secret: config.get('jwt.secret'),
      }),
      global: true,
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config) => ({
        uri: config.get('database.connectionString'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RolesModule,
    DailyCheckinModule,
    ToDoModule,
    ChecklistModule,
    CategoryModule,
    DoctorModule,
    ConsultationScheduleModule,
    MailerModule,
    AppointmentModule,
    MoodModule,
    GeminiModule,
    PredictionModule,
    VaccinationModule,
    
  ],
  controllers: [AppController, ChecklistController, DoctorController, CategoryController, ConsultationScheduleController],
  providers: [AppService, ChecklistService, DoctorService, CategoryService, ConsultationScheduleService, AppointmentService],
})
export class AppModule {}
