import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware to log all incoming requests
  app.use((req, res, next) => {
    console.log(`[Incoming Request] ${req.method} ${req.url}`);
    next();
  });

  // Validation Pipe (global)
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description and usage')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Enable CORS
  app.enableCors();

  // Log available routes
  const server = app.getHttpServer();
  const router = server._events.request._router;
  const availableRoutes = router.stack
    .filter((layer) => layer.route)
    .map(
      (layer) =>
        `${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path}`,
    );
  Logger.log(`Available Routes:\n${availableRoutes.join('\n')}`);

  // Start the application
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  Logger.log(`Application running on http://localhost:${PORT}`);
}

bootstrap();
