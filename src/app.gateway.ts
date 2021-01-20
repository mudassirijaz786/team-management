import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('AppGateway');

  afterInit(server: Server) {
    this.logger.log('AppGateway Initilized');
  }

  handleDisconnect(client: Socket) {
    this.logger.warn(`Client disconnected:  ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.debug(`Client connected:  ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return {
      event: 'message',
      data: text,
    };
  }

  //   this is equal to

  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, text: string): void {
  //     client.emit('message', text);
  //   }

  //   if we want to send a message to everyone

  //   @WebSocketServer() wss: Server;

  //   @SubscribeMessage('message')
  //   handleMessage(client: Socket, text: string): void {
  //     this.wss.emit('message', text);
  //   }
}
