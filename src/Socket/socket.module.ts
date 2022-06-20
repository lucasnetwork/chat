import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/database/schemas/userSchema';
import { UserService } from 'src/User/user.service';
import { SocketProvider } from './socket.Controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [SocketProvider, UserService],
})
export class SocketModule {}
