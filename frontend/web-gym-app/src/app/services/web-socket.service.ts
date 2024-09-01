import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/websocket'),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.onConnect = () => {
        console.log('Connected');
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        reject(frame);
      };

      this.client.activate();
    });
  }

  subscribe(topic: string, callback: (message: Message) => void) {
    this.client.onConnect = (frame) => {
      this.client.subscribe(topic, (message) => {
        callback(message);
      });
    };
  }

  send(destination: string, body: any) {
    this.client.publish({ destination, body: JSON.stringify(body) });
  }
}