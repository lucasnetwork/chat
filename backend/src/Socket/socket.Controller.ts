import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/Auth/guards/jwt.auth.guard';
import { MessageService } from 'src/Message/message.service';
import { UserService } from 'src/User/user.service';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(JwtAuthGuard)
export class SocketProvider {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}
  @SubscribeMessage('identity')
  async getMessages(socket: Socket, data: any): Promise<void> {
    try {
      console.log(data);
      const existUser = await this.userService.find(data.phone as number);
      if (existUser) {
        socket.join(existUser?.phone?.toString());
      } else {
        const newUser = await this.userService.create(data.phone as string);
        newUser.save();
        socket.join(newUser.phone.toString());
      }
    } catch {
      console.log('error');
    }
  }
  @SubscribeMessage('message')
  async sendMessage(socket: Socket, data: any): Promise<void> {
    try {
      const existUser = await this.userService.find(data.phoneTo as number);
      await this.messageService.create({
        idUser: data.phone,
        message: data.message,
        toIdUser: data.phoneTo,
      });
      if (existUser) {
        socket.to(existUser?.phone?.toString()).emit('message', {
          phone: data.phone,
          message: data.message,
        });
      }
    } catch {
      console.log('error');
    }
  }
  test(data) {
    console.log('data', data);
  }
  handleConnection() {
    console.log('handleConnection');
  }
}
