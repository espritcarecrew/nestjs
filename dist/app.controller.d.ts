import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    someProtectedRoute(req: any): {
        message: string;
        userId: any;
    };
}
