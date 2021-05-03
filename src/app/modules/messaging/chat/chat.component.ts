import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {CognitoService} from "../../../services/cognito.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }

    nb-chat {
      width: 500px;
    }
  `],
})

export class ChatComponent implements OnInit {
  messages: any[] = []

  constructor(
    private chatService: ChatService,
    private cognitoService: CognitoService) {
  }

  ngOnInit(): void {
    this.chatService
      .getNewMessageEmitter()
      .subscribe({
        next: message => {
          this.messages.push(message)
        }
      })
  }

  onSend($event) {
    const {message} = $event
    const cognitoUser = this.cognitoService.getCurrentUser()
    this.chatService.sendMessage(message, cognitoUser)
    this.messages.push({
      text: message,
      // date: new Date(),
      reply: false,
      user: {
        name: cognitoUser.getUsername()
      },
    });
  }
}
