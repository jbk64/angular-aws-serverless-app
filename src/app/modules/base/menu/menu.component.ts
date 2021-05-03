import {Component, OnInit} from '@angular/core';
import {NbMenuItem} from "@nebular/theme";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: NbMenuItem[]

  constructor() {
  }

  ngOnInit(): void {

    this.items = [
      {
        title: 'Log in',
        icon: 'person-outline',
        link: 'login'
      },
      {
        title: 'Sign up',
        icon: 'person-add',
        link: 'signup'
      }
    ];
  }
}
