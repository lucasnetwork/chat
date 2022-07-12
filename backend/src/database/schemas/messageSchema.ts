import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';
import { User } from './userSchema';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  idUser: Types.ObjectId;

  @Prop()
  message: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  toIdUser: Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
