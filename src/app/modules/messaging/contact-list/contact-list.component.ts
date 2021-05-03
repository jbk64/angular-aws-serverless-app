import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts = []

  constructor() { }

  ngOnInit(): void {
    this.contacts = [
      {
        username: 'alex',
        lastMessage: 'yo'
      },
      {
        username: 'robin',
        lastMessage: 'lorem ipsum'
      },
      {
        username: 'jack',
        lastMessage: 'asdf adghasgr5a ga4 ga'
      }
    ]
  }

}
