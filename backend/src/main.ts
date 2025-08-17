import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // elimina propiedades que no están en los DTOs
      forbidNonWhitelisted: true, // lanza error si envían propiedades extra
      transform: true             // convierte automáticamente los tipos (ej. string->number)
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
