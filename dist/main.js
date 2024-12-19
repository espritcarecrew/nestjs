"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((req, res, next) => {
        console.log(`[Incoming Request] ${req.method} ${req.url}`);
        next();
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('API description and usage')
        .setVersion('1.0')
        .addTag('API')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    app.enableCors();
    const server = app.getHttpServer();
    const router = server._events.request._router;
    const availableRoutes = router.stack
        .filter((layer) => layer.route)
        .map((layer) => `${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path}`);
    common_1.Logger.log(`Available Routes:\n${availableRoutes.join('\n')}`);
    const PORT = process.env.PORT || 3000;
    await app.listen(PORT);
    common_1.Logger.log(`Application running on http://localhost:${PORT}`);
}
bootstrap();
//# sourceMappingURL=main.js.map