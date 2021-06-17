import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {CognitoService} from "../../../services/cognito.service";
import {ConversationService} from "../../../services/conversation.service";
import {CognitoUser} from "amazon-cognito-identity-js";

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
      width: 600px;
    }
  `],
})

export class ChatComponent implements OnInit {
  cognitoUser: CognitoUser = null
  conversationId: string = null
  messages: any[] = []

  constructor(
    private chatService: ChatService,
    private cognitoService: CognitoService,
    private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.cognitoUser = this.cognitoService.getCurrentUser()
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
    if (this.conversationId) {
      this.chatService.sendMessage(message, this.conversationId, this.cognitoUser.getUsername())
    }
  }

  onSelectedConversation(conversationId: string) {
    if (conversationId) {
      this.conversationId = conversationId
      this.conversationService
        .getConversation(conversationId)
        .subscribe({
          next: messages => {
            messages.map(m => m.date = new Date(Number(m.timestamp)))
            this.messages = messages
            console.log(this.messages)
            // this.messages = messages.map(m => MessageAdapter.apiToNbChatMessage(m, this.cognitoUser.getUsername()))
          },
          error: err => {
            console.error(err)
          }
        })
    }
  }
}
