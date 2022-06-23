import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { UserService } from '../User/user.service';
import { User, UserSchema } from 'src/database/schemas/userSchema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SessionController],
  providers: [UserService],
})
export class SessionModule {}
