import {Component, OnInit} from '@angular/core';
import {NbThemeService} from "@nebular/theme";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private themeService: NbThemeService) {
  }

  ngOnInit(): void {
  }

  onCheckedChange($event: boolean) {
    if ($event) {
      this.themeService.changeTheme('dark')
    } else {
      this.themeService.changeTheme('default')
    }
  }
}
