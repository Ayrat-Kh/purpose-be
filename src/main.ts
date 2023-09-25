import { NestFactory } from '@nestjs/core';
import { patchNestJsSwagger } from 'nestjs-zod';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Purpose API example')
    .setDescription('Purpose API description')
    .setVersion('1.0')
    .addTag('purpose')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
