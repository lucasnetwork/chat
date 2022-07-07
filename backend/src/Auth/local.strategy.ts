import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authServise: AuthService) {
    super();
  }

  async validate(phone): Promise<any> {
    const user = await this.authServise.validateUser(phone);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
