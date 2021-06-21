import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Conversation} from "../types/conversation";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private conversationsUrl = 'https://v3uxo526e5.execute-api.eu-central-1.amazonaws.com/dev/conversations/'
  private usersUrl = 'https://v3uxo526e5.execute-api.eu-central-1.amazonaws.com/dev/users/'

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Creates a conversation between two users
   * @param user1 - Username of user 1
   * @param user2 - Username of user 2
   */
  createConversation(user1: string, user2: string): Observable<string[]> {
    return this.httpClient.post<string[]>(this.conversationsUrl, { user1, user2 })
  }

  /**
   * Get a user's conversations
   * @param username
   */
  getUserConversations(username): Observable<Conversation[]> {
    return this.httpClient.get<Conversation[]>(this.usersUrl + username + '/conversations')
  }

  /**
   * Get the messages from a conversation
   * @param conversationId
   */
  getConversation(conversationId): Observable<any[]> {
    return this.httpClient.get<string[]>(this.conversationsUrl + conversationId)
  }
}
