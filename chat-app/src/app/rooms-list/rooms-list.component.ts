import {Component, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {Room} from '../room';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.less']
})
export class RoomsListComponent implements OnInit {
  rooms: Promise<Room[]>;

  constructor(private roomService: RoomService) {
  }

  ngOnInit() {
    this.rooms = this.roomService.getRooms();
  }

  async addRoom() {
    const topic = prompt('New room topic');
    console.log(topic);
    if (topic !== null) {
      await this.roomService.newRoom(topic);
      this.rooms = this.roomService.getRooms();
    }
  }
}
