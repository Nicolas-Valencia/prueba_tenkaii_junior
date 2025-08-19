import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Función principal para iniciar la aplicación
// Configura CORS y las tuberías globales de validación
// Escucha en el puerto especificado o en el 3000 por defecto
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para desarrollo
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configura las tuberías globales de validación
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // IMPORTANTE: 0.0.0.0 hace que sea accesible desde otros contenedores
  // y desde el host, lo cual es necesario para Docker.
  await app.listen(port, '0.0.0.0');
  console.log(`App listening on port ${port}`);
}
bootstrap();
