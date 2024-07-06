import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { environments } from './environments/environments';
import { ValidationPipe } from '@nestjs/common';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { setupSwagger } from './swagger.config';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule);

    setupSwagger(app);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter());
    await app.listen(environments.port, () => {
      console.log(`Server is running on port ${environments.port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
