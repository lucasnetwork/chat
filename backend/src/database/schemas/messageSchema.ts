import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { User } from './userSchema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  idUser: User;

  @Prop()
  message: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  toIdUser: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
