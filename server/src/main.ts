import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './infrastructure/App/app.module';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.enableCors();

  await app.listen(parseInt(process.env.PORT) || 3000);
}

bootstrap();
