import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CognitoService} from "../../services/cognito.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chatForm: FormGroup
  messages = []
  constructor(
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private cognitoService: CognitoService) {
  }

  ngOnInit(): void {
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    })
    this.chatService
      .getNewMessageEmitter()
      .subscribe({
        next: message => {
          this.messages.push(message)
          console.log(message)
        }
      })
  }

  onSend() {
    const {message} = this.chatForm.value
    const cognitoUser = this.cognitoService.getCurrentUser()
    this.chatService.sendMessage(message, cognitoUser)
    this.chatForm.reset()
  }
}
