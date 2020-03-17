import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../room.service';
import {MessagesService} from '../messages.service';
import {Observable, Subscription} from 'rxjs';
import {Message} from '../message';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.less']
})
export class RoomComponent implements OnInit, OnDestroy, AfterViewChecked {
  roomId: string;
  messages: Observable<Message[]>;
  messageModel: string;
  userId = '5e6e689d4d0ef83195b71480';
  @ViewChild('#chat') private myScrollContainer: ElementRef;

  constructor(private route: ActivatedRoute, private messagesService: MessagesService) {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit(): void {
    this.roomId = this.route.snapshot.paramMap.get('roomId');
    this.messagesService.ready();
    this.messages = this.messagesService.listenForMessages();
    this.scrollToBottom();
  }

  sendMessage() {
    if (this.messageModel.trim().length > 0) {
      this.messagesService.newMessage(this.messageModel.trim(), this.roomId, this.userId);
      this.messageModel = '';
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  ngOnDestroy(): void {
    this.messagesService.close();
  }

}
