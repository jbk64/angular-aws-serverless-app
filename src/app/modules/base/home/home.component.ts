import {Component, OnInit} from '@angular/core';
import {CognitoService} from "../../../services/cognito.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedIn: boolean
  items: any;
  constructor(private cognitoService: CognitoService) { }

  ngOnInit(): void {
    this.loggedIn = this.cognitoService.getCurrentUser() !== null
    this.items = [
      { title: 'Settings' },
      { title: 'Logout' },
    ];
  }

}
