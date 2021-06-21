import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Message} from "../../types/message";
import {ChatService} from "../../services/chat.service";
import {CognitoService} from "../../services/cognito.service";
import {ConversationService} from "../../services/conversation.service";
import {CognitoUser} from "amazon-cognito-identity-js";
import {Conversation} from "../../types/conversation";

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewChecked {
  @Input() conversation: Conversation

  cognitoUser: CognitoUser = null
  messages: Message[] = []
  message: string;
  loading = true;

  constructor(
    private chatService: ChatService,
    private cognitoService: CognitoService,
    private conversationService: ConversationService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.cognitoUser = this.cognitoService.getCurrentUser()
    this.chatService
      .getNewMessageEmitter()
      .subscribe({
        next: message => {
          if (message['content']) {
            this.messages.push(message)
          }
        }
      })
    this.conversationService
      .getConversation(this.conversation.id)
      .subscribe({
        next: messages => {
          messages.map(m => {
            m.date = new Date(Number(m.timestamp))
          })
          this.messages = messages
          console.log(this.messages)
          this.loading = false
        },
        error: err => {
          console.error(err)
        }
      })
  }

  onSend($event) {
    const content = $event.target.value
    if (content.length > 0) {
      this.chatService.sendMessage(content, this.conversation.id, this.cognitoUser.getUsername())
    }
    this.message = ''
  }

  ngAfterViewChecked(): void {
    const element = document.getElementById('scrollable');
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }
}
