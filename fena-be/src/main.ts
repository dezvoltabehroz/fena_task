import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Krane Task')
    .setDescription("The Krane's API Description")
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT');

  app.enableCors()
  await app.listen(port, () => {
    console.log('[API]', configService.get<string>('BASE_URL'));
  });
}

bootstrap();
