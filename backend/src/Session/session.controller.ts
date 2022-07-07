import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class SessionController {
  @UseGuards(AuthGuard('local'))
  @Post()
  async create(@Request() req) {
    console.log(req);
    return req.user;
  }
}
