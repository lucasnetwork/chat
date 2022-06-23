import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/User/user.service';

@Controller('login')
export class SessionController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Req() req: Request) {
    const existPhone = this.userService.find(req.body.phone);
    if (existPhone) {
      return existPhone;
    }
    return this.userService.create(req.body.phone);
  }
}
