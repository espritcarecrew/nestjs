"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const User_service_1 = require("./User.service");
const User_controller_1 = require("./User.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const refresh_token_schema_1 = require("./schemas/refresh-token.schema");
const reset_token_schema_1 = require("./schemas/reset-token.schema");
const mail_service_1 = require("../services/mail.service");
const roles_module_1 = require("../roles/roles.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            roles_module_1.RolesModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: refresh_token_schema_1.RefreshToken.name,
                    schema: refresh_token_schema_1.RefreshTokenSchema,
                },
                {
                    name: reset_token_schema_1.ResetToken.name,
                    schema: reset_token_schema_1.ResetTokenSchema,
                },
            ]),
        ],
        controllers: [User_controller_1.AuthController],
        providers: [User_service_1.AuthService, mail_service_1.MailService],
        exports: [User_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=User.module.js.map