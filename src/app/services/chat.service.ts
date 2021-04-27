import {EventEmitter, Injectable} from '@angular/core';
import {WebsocketService} from "./websocket.service";
import {environment} from "../../environments/environment";
import {CognitoUser} from "amazon-cognito-identity-js";

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
          const message = JSON.parse(JSON.parse(unescape(data)))
          this.newMessageEmitter.emit(message)
        }
      }
    );
  }

  getNewMessageEmitter(): EventEmitter<any> {
    return this.newMessageEmitter;
  }

  sendMessage(message: string, user: CognitoUser) {
    const username = user.getUsername()
    const data = {
      id: "",
      message,
      action: 'sendMessage',
      timestamp: Date.now(),
      sent_by: username,
    }
    this.websocketService.subject.next(data)
  }
}
