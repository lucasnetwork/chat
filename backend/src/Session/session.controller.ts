import { Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/Auth/auth.service';

@Controller('login')
export class SessionController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async create(@Request() req) {
    console.log(req);
    const response = await this.authService.validateUser(req.body.phone);
    const token = this.authService.login(response.id);
    console.log(token);
    return token;
  }
}
