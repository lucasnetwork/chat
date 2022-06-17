import { Module } from '@nestjs/common';
import { MessageController } from './message.Controller';
import { MessageService } from './message.service';
@Module({
  imports: [],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
