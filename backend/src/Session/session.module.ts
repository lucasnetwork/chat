import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { UserService } from '../User/user.service';
import { User, UserSchema } from 'src/database/schemas/userSchema';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [],
  controllers: [SessionController],
  providers: [],
})
export class SessionModule {}
