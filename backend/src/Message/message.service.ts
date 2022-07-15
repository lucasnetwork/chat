import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/database/schemas/messageSchema';
import { User, UserDocument } from 'src/database/schemas/userSchema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}
  all(id: string): Promise<MessageDocument[]> {
    return this.messageModel
      .find({ $or: [{ idUser: id }, { toIdUser: id }] })
      .populate('idUser', 'toIdUser')
      .exec();
  }

  async create(object: {
    message: string;
    idUser: string;
    toIdUser: string;
  }): Promise<MessageDocument> {
    const createMessage = new this.messageModel(object);
    return await createMessage.save();
  }
}
