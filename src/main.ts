import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@app/app.module';
import {
  INestApplication,
  Logger,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<{ port: number }> {
  const app: INestApplication = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });

  const configService: ConfigService<any, boolean> = app.get(ConfigService);
  const appConfig = configService.get('app');

  {
    /**
     * loggerLevel: 'error' | 'warn' | 'log' | 'verbose' | 'debug' | 'silly';
     * https://docs.nestjs.com/techniques/logger#log-levels
     */
    const options = appConfig.loggerLevel;
    app.useLogger(options);
    app.useGlobalPipes(new ValidationPipe());
  }

  {
    /**
     * set global prefix for all routes except GET /
     */
    const options = {
      exclude: [{ path: '/', method: RequestMethod.GET }],
    };

    app.setGlobalPrefix('api', options);
  }

  {
    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle('Api v1')
      .setDescription('Starter API v1')
      .setVersion('1.0')
      .addBearerAuth({ in: 'header', type: 'http' })
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(appConfig.port);

  return appConfig;
}

bootstrap().then((appConfig) => {
  Logger.log(`Running in http://localhost:${appConfig.port}`, 'Bootstrap');
});
