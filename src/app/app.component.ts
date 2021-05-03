import {Component, OnInit} from '@angular/core';
import {CognitoService} from "./services/cognito.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loggedIn: boolean
  title = 'serverless-app';

  constructor(private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.loggedIn = this.cognitoService.getCurrentUser() !== null
  }
}
