import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private client: Client;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      reconnectDelay: 5000,
    });
    this.client.activate();
  }

  sendMessage(sender: string, recipient: string, content: string) {
    this.client.publish({
      destination: '/app/chat',
      body: JSON.stringify({ sender, recipient, content }),
    });
  }

  onMessage(callback: (msg: Message) => void) {
    this.client.subscribe('/user/topic/messages', callback);
  }
}
