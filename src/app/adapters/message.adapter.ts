import {ChatMessage} from "../types/ChatMessage";

export class MessageAdapter {
  static messageEventDataToChatMessage (messageEventData: any): ChatMessage {
    return {
      text: messageEventData.text,
      sent_by: messageEventData.sent_by,
      timestamp: new Date(messageEventData.timestamp).toLocaleTimeString()
    }
  }
}
