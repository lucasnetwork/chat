import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './Message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './Socket/socket.module';
import { UserModule } from './User/user.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    MessageModule,
    SocketModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
