import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getHealth(): Promise<{
        status: string;
        database: string;
    }>;
    getBackendHealth(): Promise<{
        status: string;
        server: string;
        database: string;
        timestamp: string;
        error?: undefined;
    } | {
        status: string;
        server: string;
        database: string;
        error: string;
        timestamp: string;
    }>;
}
