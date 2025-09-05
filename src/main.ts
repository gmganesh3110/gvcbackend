import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'x-webhook-signature',
      'x-webhook-timestamp',
      'content-type',
    ],
  });

  // ✅ Capture rawBody for Cashfree webhooks
  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf.toString(); // store raw body for signature verification
      },
    }),
  );

  // ✅ Parse URL-encoded payloads if needed (not raw)
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ✅ Logging
  app.use(morgan('dev'));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Server started at http://localhost:${port}`);
}
bootstrap();
