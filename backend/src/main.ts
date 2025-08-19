import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para desarrollo
  app.enableCors({
    origin: "http://localhost:5173", // front; o '*' si quieres temporalmente
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // IMPORTANT: bind to 0.0.0.0 so que sea accesible desde otros contenedores
  await app.listen(port, '0.0.0.0');
  console.log(`App listening on port ${port}`);
}
bootstrap();
