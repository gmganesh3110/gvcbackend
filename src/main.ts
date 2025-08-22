import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Add Morgan HTTP request logger
  app.use(morgan('dev')); // or 'combined', 'tiny', etc.

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server started at http://localhost:${port}`);
}
bootstrap();
