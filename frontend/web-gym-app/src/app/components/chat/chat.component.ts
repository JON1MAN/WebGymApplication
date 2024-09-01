import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  
  public users!: User[]; 

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.getUsers();
  }

  public getUsers(): void{
    this.userService.getAllUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}


// @Component({
//   selector: 'app-chat',
//   templateUrl: './chat.component.html',
//   styleUrls: ['./chat.component.css']
// })
// export class ChatComponent implements OnInit {
//   users = [];
//   selectedUser: any;
//   messages = [];
//   loggedInUserEmail: string;

//   constructor(private webSocketService: WebSocketService, private userService: UserService) {
//     this.loggedInUserEmail = UserService.loggedUser.email;
//   }

//   ngOnInit(): void {
//     this.webSocketService.subscribe('/topic/chats', (message) => {
//       const msg = JSON.parse(message.body);
//       if (msg.senderEmail === this.loggedInUserEmail || msg.recipientEmail === this.loggedInUserEmail) {
//         this.messages.push(msg);
//       }
//     });
//   }

//   selectUser(user: any) {
//     this.selectedUser = user;
//   }

//   sendMessage(content: string) {
//     if (content.trim() === '' || !this.selectedUser) return;
//     const message = {
//       senderEmail: this.loggedInUserEmail,
//       recipientEmail: this.selectedUser.email,
//       content: content,
//       time: new Date()
//     };
//     this.webSocketService.send('/app/chats', message);
//   }
// }