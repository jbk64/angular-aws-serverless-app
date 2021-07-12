export interface Conversation {
  id: string,
  withUser: string,
  withUserImage?: string,
  lastMessage?: string
  lastMessageTimestamp?: string;
}
