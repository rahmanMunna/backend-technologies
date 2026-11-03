import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { setupApiDocs } from './config/api-docs.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableShutdownHooks();

  // Validate every request body against its DTO.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown fields
      forbidNonWhitelisted: true, // ...and reject requests that send them
      transform: true, // turn plain JSON into DTO class instances
    }),
  );

  setupApiDocs(app);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/api`);
  console.log(`API docs on    http://localhost:${port}/docs`);
}
await bootstrap();
