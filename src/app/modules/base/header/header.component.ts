import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NbMenuService} from "@nebular/theme";
import {Router} from "@angular/router";
import {CognitoService} from "../../../services/cognito.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  contextMenuItems = [
    {title: 'Settings', icon: 'settings-2-outline'},
    {title: 'Log out', icon: 'log-out-outline'}
  ]
  contextMenuTrigger = "hover"

  constructor(
    private nbMenuService: NbMenuService,
    private router: Router,
    private cognitoService: CognitoService
  ) {
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .subscribe(menuBag => {
        if (menuBag.item.title === 'Settings') {
          this.router.navigate(['settings'])
        } else if (menuBag.item.title === 'Log out') {
          this.cognitoService.logout()
          window.location.reload()
        }
      });
  }
}
