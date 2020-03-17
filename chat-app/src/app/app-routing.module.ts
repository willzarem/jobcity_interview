import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RoomsListComponent} from './rooms-list/rooms-list.component';
import {RoomComponent} from './room/room.component';


const routes: Routes = [
  {
    path: '',
    component: RoomsListComponent
  },
  {
    path: 'room/:roomId',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
