import {Component, OnInit} from '@angular/core';
import {Conversation} from "../../types/conversation";
import {S3Service} from "../../services/s3.service";
import {CognitoUser} from "amazon-cognito-identity-js";
import {CognitoService} from "../../services/cognito.service";
import {LocalStorageService} from "../../services/local-storage.service";
import {UserService} from "../../services/user.service";
import {ConversationService} from "../../services/conversation.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  cognitoUser: CognitoUser
  selectedConversation: Conversation = null
  imageUrl: string
  searchMode = false
  search: string = null
  searchResults: string[] = []

  constructor(
    private userService: UserService,
    private S3Service: S3Service,
    private cognitoService: CognitoService,
    private localstorageService: LocalStorageService,
    private conversationService: ConversationService
  ) {
  }

  ngOnInit(): void {
    this.cognitoUser = this.cognitoService.getCurrentUser()
    this.imageUrl = this.S3Service.getImageUrl(
      this.cognitoUser.getUsername()
    )
  }

  onConversationSelected(conversation: Conversation) {
    this.selectedConversation = conversation
  }

  onConversationDeselected() {
    this.selectedConversation = null
  }

  onSearch($event: Event) {
    const target = $event.target as HTMLInputElement
    const searchQuery = target.value
    console.log(searchQuery)
    if (searchQuery.length > 0) {
      this.searchMode = true
      this.userService
        .list(searchQuery)
        .subscribe({
          next: searchResults => {
            this.searchResults = searchResults.filter(result => {
              return !result.includes(this.cognitoUser.getUsername())
            })
          },
          error: error => {
            console.error(error)
          }
        })
    } else {
      this.searchMode = false
    }
  }

  uploadFile($event: Event) {
    const target = $event.target as HTMLInputElement
    this.S3Service.putObject(
      this.cognitoUser.getUsername(),
      target.files[0]
    )
  }

  onLogout() {
    this.cognitoService.logout()
    this.localstorageService.removeItem('conversations')
    window.location.reload()
  }

  onSearchResultClick(username) {
    const currentUser = this.cognitoService.getCurrentUser().getUsername()
    const conversations = this.localstorageService.getItem('conversations')
    if (!conversations.map(c => c['with']).includes(username)) {
      this.conversationService
        .createConversation(currentUser, username)
        .subscribe({
          next: (response) => {
            console.log(response)
          },
          error: (err) => {
            console.error(err)
          }
        })
    }
    this.searchMode = false
    this.search = ""
  }
}
