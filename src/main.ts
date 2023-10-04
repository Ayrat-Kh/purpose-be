import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/configuration.service';

patchNestJsSwagger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Purpose API example')
    .setDescription('Purpose API description')
    .setVersion('1.0')
    .addTag('purpose')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.use(
    cookieParser(app.get(ConfigurationService).get('auth0').cookieSignKey),
  );

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
