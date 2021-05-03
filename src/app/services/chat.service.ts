import {EventEmitter, Injectable} from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {environment} from "../../environments/environment";
import {CognitoUser} from "amazon-cognito-identity-js";
import {MessageAdapter} from "../adapters/message.adapter";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private url = environment.awsWebsocketApiUrl
  private newMessageEmitter: EventEmitter<any> = new EventEmitter()

  constructor(private websocketService: WebsocketService) {
    this.websocketService.connect(this.url).subscribe(
      {
        next: messageEvent => {
          const { data } = messageEvent
          const messageEventData = JSON.parse(data)
          if (messageEventData.action === 'sendMessage') {
            const chatMessage = MessageAdapter.messageEventDataToChatMessage(messageEventData, true)
            this.newMessageEmitter.emit(chatMessage)
          }
        }
      }
    );
  }

  getNewMessageEmitter(): EventEmitter<any> {
    return this.newMessageEmitter;
  }

  sendMessage(text: string, user: CognitoUser) {
    const username = user.getUsername()
    const data = {
      text,
      action: 'sendMessage',
      timestamp: Date.now(),
      sent_by: username,
    }
    this.websocketService.subject.next(data)
  }
}
