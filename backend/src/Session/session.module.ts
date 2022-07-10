import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionController } from './session.controller';
import { UserService } from '../User/user.service';
import { User, UserSchema } from 'src/database/schemas/userSchema';
import { UserModule } from 'src/User/user.module';
import { AuthModule } from 'src/Auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SessionController],
  providers: [],
})
export class SessionModule {}
