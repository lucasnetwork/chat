import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/database/schemas/messageSchema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}
  getHello(): Promise<MessageDocument[]> {
    return this.messageModel.find().exec();
  }

  async create(object: {
    message: string;
    idUser: string;
    toIdUser: string;
  }): Promise<MessageDocument> {
    console.log(object);
    const createMessage = new this.messageModel(object);
    return await createMessage.save();
  }
}
