import {Component} from '@angular/core';
import {CognitoUser} from "amazon-cognito-identity-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cognitoUser: CognitoUser = null
  title = 'serverless-app';
}
