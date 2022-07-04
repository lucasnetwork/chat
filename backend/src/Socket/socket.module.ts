import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/database/schemas/messageSchema';
import { User, UserSchema } from 'src/database/schemas/userSchema';
import { MessageService } from 'src/Message/message.service';
import { UserService } from 'src/User/user.service';
import { SocketProvider } from './socket.Controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [SocketProvider, UserService, MessageService],
})
export class SocketModule {}
