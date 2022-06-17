import { Controller, Get, Post } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  getMessages(): string {
    return 'Hello World!';
  }
  @Post()
  sendMessage(): string {
    return 'Message sent!';
  }
}
