import { Injectable, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/database/schemas/messageSchema';
import { User, UserDocument } from 'src/database/schemas/userSchema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async validateUser(phone: number): Promise<UserDocument> {
    const existPhone = this.userModel.findOne({ phone }).exec();
    if (existPhone) {
      return existPhone;
    }
    const createUser = new this.userModel({ phone });
    return await createUser.save();
  }
}
