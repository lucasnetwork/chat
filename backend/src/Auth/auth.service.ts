import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/userSchema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(phone: number): Promise<UserDocument> {
    const existPhone = this.userModel.findOne({ phone }).exec();
    console.log('user', existPhone);
    if (existPhone) {
      return existPhone;
    }
    const createUser = new this.userModel({ phone });
    await createUser.save();
  }

  async login(id: number) {
    const payload = { id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
