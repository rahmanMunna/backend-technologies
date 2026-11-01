import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

// Builds the OpenAPI spec from the @Api* decorators and serves it with Scalar.
export function setupApiDocs(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setDescription('Practice API for users and products')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Raw OpenAPI JSON (handy for importing into Postman, Insomnia, etc.)
  app.getHttpAdapter().get('/openapi.json', (_req, res) => res.json(document));

  // Scalar UI
  app.use('/docs', apiReference({ content: document }));
}
