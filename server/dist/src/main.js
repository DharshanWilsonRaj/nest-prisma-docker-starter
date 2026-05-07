"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./prisma/prisma.service");
(0, dotenv_1.config)({ path: (0, path_1.resolve)(process.cwd(), '../.env') });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const prismaService = app.get(prisma_service_1.PrismaService);
    await prismaService.enableShutdownHooks(app);
    app.enableCors({
        origin: process.env.CLIENT_ORIGIN || 'http://localhost:5174',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const port = Number(process.env.SERVER_PORT);
    await app.listen(port, '0.0.0.0');
    console.log(`Server is running on http://0.0.0.0:${port}`);
}
bootstrap().catch((error) => {
    console.error('Bootstrap error:', error);
    process.exit(1);
});
//# sourceMappingURL=main.js.map