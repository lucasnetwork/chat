import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './Message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}