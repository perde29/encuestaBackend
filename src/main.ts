import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
//import * as crypto from 'crypto';
//(global as any).crypto = crypto;

import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  //const config = app.get(ConfigService);

  //const secret = config.get<string>(JWT_TOKEN);

  // Habilitar validaciones globales
  initSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  /* app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: false,
      forbidNonWhitelisted: false,
    }),
  ); */

  await app.listen(3001);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
