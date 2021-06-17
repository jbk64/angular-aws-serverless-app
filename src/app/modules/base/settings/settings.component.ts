import {Component, OnInit} from '@angular/core';
import {NbThemeService} from "@nebular/theme";
import {UserService} from "../../../services/user.service";
import {CognitoService} from "../../../services/cognito.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private themeService: NbThemeService,
    private userService: UserService,
    private cognitoService: CognitoService) {
  }

  ngOnInit(): void {
  }

  onCheckedChange($event: boolean) {
    let darkMode = false
    if ($event) {
      this.themeService.changeTheme('dark')
      darkMode = true
    } else {
      this.themeService.changeTheme('default')
    }
    const preferences = {darkMode}
    this.updateUserPreferencs(preferences)
  }

  updateUserPreferencs(preferences) {
    const username = this.cognitoService.getCurrentUser().getUsername()
    this.userService
      .updatePreferences(username, preferences)
      .subscribe({
        next: () => {
          console.log('updated')
        },
        error: err => {
          console.error(err)
        }
      })
  }
}
