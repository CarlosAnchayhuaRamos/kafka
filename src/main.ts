import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      consumer: {
        groupId: 'kafka-consumer',
      },
      client: {
        brokers: ['pkc-4nym6.us-east-1.aws.confluent.cloud:9092'],
        sasl: {
          brokers: [''],
          ssl: true,
          sasl: {
            mechanism: 'plain',
            username: '',
            password: '',
          }
        }
      }
    }
  })
  await app.listen(3000);
}
bootstrap();
