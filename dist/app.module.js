"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const User_module_1 = require("./User/User.module");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const roles_module_1 = require("./roles/roles.module");
const daily_checkin_module_1 = require("./daily-checkin/daily-checkin.module");
const todo_module_1 = require("./todo/todo.module");
const checklist_service_1 = require("./checklist/checklist.service");
const checklist_controller_1 = require("./checklist/checklist.controller");
const checklist_module_1 = require("./checklist/checklist.module");
const doctor_service_1 = require("./doctor/doctor.service");
const doctor_controller_1 = require("./doctor/doctor.controller");
const consultation_schedule_module_1 = require("./consultation-schedule/consultation-schedule.module");
const consultation_schedule_controller_1 = require("./consultation-schedule/consultation-schedule.controller");
const doctor_module_1 = require("./doctor/doctor.module");
const category_service_1 = require("./category/category.service");
const category_controller_1 = require("./category/category.controller");
const category_module_1 = require("./category/category.module");
const consultation_schedule_service_1 = require("./consultation-schedule/consultation-schedule.service");
const appointment_service_1 = require("./appointment/appointment.service");
const appointment_module_1 = require("./appointment/appointment.module");
const config_2 = require("./config/config");
const mailer_module_1 = require("./mailer/mailer.module");
const gemini_module_1 = require("./gemini/gemini.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                load: [config_2.default],
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    secret: config.get('jwt.secret'),
                }),
                global: true,
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (config) => ({
                    uri: config.get('database.connectionString'),
                }),
                inject: [config_1.ConfigService],
            }),
            User_module_1.AuthModule,
            roles_module_1.RolesModule,
            daily_checkin_module_1.DailyCheckinModule,
            todo_module_1.ToDoModule,
            checklist_module_1.ChecklistModule,
            category_module_1.CategoryModule,
            doctor_module_1.DoctorModule,
            consultation_schedule_module_1.ConsultationScheduleModule,
            mailer_module_1.MailerModule,
            appointment_module_1.AppointmentModule,
            gemini_module_1.GeminiModule,
        ],
        controllers: [app_controller_1.AppController, checklist_controller_1.ChecklistController, doctor_controller_1.DoctorController, category_controller_1.CategoryController, consultation_schedule_controller_1.ConsultationScheduleController],
        providers: [app_service_1.AppService, checklist_service_1.ChecklistService, doctor_service_1.DoctorService, category_service_1.CategoryService, consultation_schedule_service_1.ConsultationScheduleService, appointment_service_1.AppointmentService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map