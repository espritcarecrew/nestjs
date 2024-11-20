import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/User/User.service';
export declare class AuthorizationGuard implements CanActivate {
    private reflector;
    private authService;
    constructor(reflector: Reflector, authService: AuthService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}