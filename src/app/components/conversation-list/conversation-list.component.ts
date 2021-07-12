import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Conversation} from "../../types/conversation";
import {ConversationService} from "../../services/conversation.service";
import {CognitoService} from "../../services/cognito.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {S3Service} from "../../services/s3.service";

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
    private localStorageService: LocalStorageService,
    private S3Service: S3Service
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.conversations = this.localStorageService.getItem('conversations')
    const username = this.cognitoService.getCurrentUser().getUsername()
    this.conversationService
      .getUserConversations(username)
      .subscribe({
        next: conversations => {
          this.conversations = conversations
          this.conversations = conversations.map(c => {
            return {...c, withUserImage: this.S3Service.getImageUrl(c.withUser)} as Conversation
          })
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
