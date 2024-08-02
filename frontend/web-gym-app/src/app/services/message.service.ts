import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private apiServerUrl  = 'http://localhost:8080/home';

  constructor(private http: HttpClient) { }

  public sendMessage(message: Message)Observable<User[]>

}
