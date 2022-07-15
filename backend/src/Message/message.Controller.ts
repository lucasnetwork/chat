import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/Auth/guards/jwt.auth.guard';
import { MessageDocument } from 'src/database/schemas/messageSchema';
import { MessageService } from './message.service';

@Controller('/message')
@UseGuards(JwtAuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Get()
  all(@Req() request): Promise<MessageDocument[]> {
    if (request.user?.id) {
      console.log('request', request.user?.id);
      return this.messageService.all(request.user.id as string);
    }
  }
  @Post()
  create(@Req() request: Request): Promise<MessageDocument> {
    return this.messageService.create(request.body);
  }
}
