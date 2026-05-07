import { PrismaService } from './prisma/prisma.service.js';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    getAllUsers(page?: number, limit?: number): Promise<{
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
    searchUsersByEmail(email: string, page?: number, limit?: number): Promise<{
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
