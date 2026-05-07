import { PrismaService } from './prisma/prisma.service';
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
}
