import {EventEmitter, Injectable} from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {environment} from "../../environments/environment";
import {MessageAdapter} from "../adapters/message.adapter";
import {CognitoService} from "./cognito.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = environment.awsWebsocketApiUrl
  private newMessageEmitter: EventEmitter<any> = new EventEmitter()

  constructor(
    private websocketService: WebsocketService,
    private cognitoService: CognitoService
    ) {
    const username = this.cognitoService.getCurrentUser().getUsername()
    this.websocketService.connect(this.url, username).subscribe(
      {
        next: messageEvent => {
          const {data} = messageEvent
          this.handleIncomingMessage(data)
        }
      }
    );
  }

  handleIncomingMessage(data) {
    const message = JSON.parse(data)
    this.newMessageEmitter.emit(message)
  }

  getNewMessageEmitter(): EventEmitter<any> {
    return this.newMessageEmitter;
  }

  sendMessage(content: string, conversationId: string, sender: string) {
    this.websocketService.subject.next({
      action: 'sendMessage',
      content,
      sender,
      conversation_id: conversationId
    })
  }
}
