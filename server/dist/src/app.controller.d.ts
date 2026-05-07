import { AppService } from './app.service.js';
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
    getAllUsers(page?: string, limit?: string): Promise<{
        data: {
            id: number;
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    searchUsers(email?: string, page?: string, limit?: string): Promise<{
        data: {
            id: number;
            email: string;
            name: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getUserById(id: number): Promise<{
        id: number;
        email: string;
        name: string | null;
        createdAt: Date;
        updatedAt: Date;
        posts: {
            id: number;
            title: string;
            published: boolean;
        }[];
    } | null>;
}
