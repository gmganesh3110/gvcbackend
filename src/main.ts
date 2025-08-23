import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(morgan('dev')); // or 'combined', 'tiny', etc.

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server started at http://localhost:${port}`);
}
bootstrap();
