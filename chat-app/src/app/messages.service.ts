import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Message} from './message';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages: Observable<Message[]>;

  constructor(private socket: Socket) {
    this.messages = this.socket.fromEvent<Message[]>('messages');
  }

  listenForMessages(): Observable<Message[]> {
    return this.socket.fromEvent<Message[]>('messages');
  }

  ready() {
    this.socket.connect();
  }

  newMessage(body: string, roomId: string, userId: string) {
    this.socket.emit('addMessage', {body, roomId, userId, createdAt: new Date().toISOString()} as Message);
  }

  close() {
    this.socket.disconnect();
  }
}
