import { UseGuards } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtAuthGuard } from 'src/Auth/guards/jwt.auth.guard';
import { MessageService } from 'src/Message/message.service';
import { UserService } from 'src/User/user.service';
import { decode } from 'jsonwebtoken';
// @UseGuards(JwtAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketProvider {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService,
  ) {}
  @SubscribeMessage('identity')
  async getMessages(socket: Socket, data: any): Promise<void> {
    try {
      console.log(data);
      const token = decode(
        socket.handshake.headers.authorization.split(' ')[1],
      ) as { id: string };

      const existUser = await this.userService.find(token.id);
      console.log(existUser);
      if (existUser) {
        console.log('join');
        socket.join(existUser.phone.toString());
      }
    } catch {
      console.log('error');
    }
  }
  @SubscribeMessage('message')
  async sendMessage(socket: Socket, data: any): Promise<void> {
    console.log(socket.handshake.headers.authorization);
    const token = decode(
      socket.handshake.headers.authorization.split(' ')[1],
    ) as { id: string };
    try {
      const existUser = await this.userService.findByPhone(data.phoneTo);
      const userSend = await this.userService.find(token.id);

      if (existUser) {
        await this.messageService.create({
          idUser: token.id,
          message: data.message,
          toIdUser: existUser._id,
        });
        console.log('token', data);
        console.log('token2', existUser);
        console.log('token3', token);
        socket.to(existUser.phone.toString()).emit('message', {
          phone: userSend?._id,
          message: data.message,
        });
      }
    } catch (e) {
      console.log('error', e);
    }
  }
  test(data) {
    console.log('data', data);
  }
  handleConnection() {
    console.log('handleConnection');
  }
}
