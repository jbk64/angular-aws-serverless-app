import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Observable, of} from "rxjs";
import {CognitoService} from "../../../services/cognito.service";
import {ConversationService} from "../../../services/conversation.service";
import {LocalStorageService} from "../../../services/local-storage.service";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() selectedConversation: EventEmitter<string> = new EventEmitter()
  conversations = []
  options: string[]
  filteredOptions$: Observable<string[]>

  constructor(
    private userService: UserService,
    private conversationService: ConversationService,
    private cognitoService: CognitoService,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.conversations = this.localStorageService.getItem('conversations')
    const username = this.cognitoService.getCurrentUser().getUsername()
    this.conversationService
      .getUserConversations(username)
      .subscribe({
        next: result => {
          this.conversations = result
          this.localStorageService.setItem('conversations', this.conversations)
        },
        error: err => {
          console.error(err)
        }
      })
    this.selectedConversation.emit(null)
  }

  onSearch($event) {
    const searchQuery = $event.target.value
    this.userService
      .list(searchQuery)
      .subscribe({
        next: result => {
          this.filteredOptions$ = of(result)
        },
        error: error => {
          console.error(error)
        }
      })
  }
  onUserSelection(username) {
    const currentUser = this.cognitoService.getCurrentUser().getUsername()
    if (!this.conversations.map(c => c['withUser']).includes(username)) {
      this.conversationService
        .createConversation(currentUser, username)
        .subscribe({
          next: (result) => {
            this.selectedConversation.emit(this.conversations.find(c => c['withUser'] === username)['id'])
          },
          error: (err) => {
            console.error(err)
          }
        })
    }
  }

  onConversationSelected(conversationId) {
    this.selectedConversation.emit(conversationId)
  }
}
