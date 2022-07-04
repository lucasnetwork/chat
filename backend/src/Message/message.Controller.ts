import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { MessageDocument } from 'src/database/schemas/messageSchema';
import { MessageService } from './message.service';

@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get(':id')
  all(@Req() request: Request): Promise<MessageDocument[]> {
    return this.messageService.all(request.params.id);
  }
  @Post()
  create(@Req() request: Request): Promise<MessageDocument> {
    return this.messageService.create(request.body);
  }
}
