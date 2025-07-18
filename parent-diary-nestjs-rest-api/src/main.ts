import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationWrapperPipe } from './pipes/validation-wrapper/validation-wrapper.pipe';
import * as session from 'express-session';
import { randomBytes } from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationWrapperPipe({
      enableDebugMessages: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: [
      process.env.NEXT_JS_FRONT_URL,
      'http://localhost:3000',
    ],
    credentials: true,
  });
  app.use(
    session({
      secret: randomBytes(20).toString('hex'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
