import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ValidationWrapperPipe } from './pipes/validation-wrapper/validation-wrapper.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationWrapperPipe({
    enableDebugMessages: true,
  }));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors({
    origin: process.env.NEXT_JS_FRONT_URL,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
