import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Conversation} from "../../types/conversation";
import {ConversationService} from "../../services/conversation.service";
import {CognitoService} from "../../services/cognito.service";
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  @Output() conversationSelected: EventEmitter<Conversation> = new EventEmitter()
  conversations: Conversation[] = []
  loading = true;

  constructor(
    private conversationService: ConversationService,
    private cognitoService: CognitoService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.conversations = this.localStorageService.getItem('conversations')
    const username = this.cognitoService.getCurrentUser().getUsername()
    this.conversationService
      .getUserConversations(username)
      .subscribe({
        next: data => {
          this.conversations = data
          this.localStorageService.setItem('conversations', this.conversations)
          this.loading = false
        },
        error: err => {
          console.error(err)
        }
      })
  }

  onConversationSelected(c: Conversation) {
    this.conversationSelected.emit(c)
  }
}
