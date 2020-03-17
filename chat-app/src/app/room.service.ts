import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private basePath = '/rooms';

  constructor(private http: HttpClient) {
  }

  async getRooms() {
    const result: { count: number, rows: any[] } | any = await this.http.get(`${environment.api}${this.basePath}`).toPromise();
    return result.rows;
  }

  async newRoom(topic: string) {
    return this.http.post(`${environment.api}${this.basePath}`, {
      topic
    }).toPromise();
  }
}
