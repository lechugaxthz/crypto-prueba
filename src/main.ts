import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  /* config */
  /* 
  app.useGlobalFilters()
  app.useGlobalInterceptors() 
  */

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }))

  SwaggerModule.setup(
    '/api/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Crypto')
        .setDescription('Esquema Crypto app')
        .setVersion('1.0.0')
        .build()
    )
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
