export class MessageAdapter {
  static messageEventDataToChatMessage(messageEventData, reply = true) {
    return {
      text: messageEventData.text,
      user: {
        name: messageEventData.sent_by
      },
      reply,
      // date: new Date(messageEventData.timestamp)
    }
  }
}
