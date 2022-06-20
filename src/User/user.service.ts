import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/userSchema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  getHello(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async create(phone: string): Promise<UserDocument> {
    const createUser = new this.userModel({ phone });
    return await createUser.save();
  }
}
