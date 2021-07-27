import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Message } from './message';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiURL = environment.urlMessage;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  messageSubject = new BehaviorSubject<Message>(null);

  constructor(
    private http: HttpClient,
  ) { }

  newMessage(message: Message): Observable<any> {
    return this.http.put(`${this.apiURL}new-message`, message).pipe(map((res: any) => {
      if (res) {
        return res;
      }
    }));
  }

  setSubject(message: Message) {
    this.messageSubject.next(message);
  }

  messages(): Observable<Message[]> {
    return this.http.get(`${this.apiURL}messages`).pipe(map((res: any) => {
      if (res) {
        return res.messages;
      }
    }));
  }
}
