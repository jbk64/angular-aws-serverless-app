import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool} from "amazon-cognito-identity-js";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor(private localStorageService: LocalStorageService) {
  }

  private poolData = {
    UserPoolId: environment.awsUserPoolId,
    ClientId: environment.awsUserPoolClientId
  }

  private userPool = new CognitoUserPool(this.poolData)

  signUp(username: string, email: string, password: string, callback) {
    const cognitoUserEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
    this.userPool.signUp(username, password, [cognitoUserEmail], null, callback)
  }

  confirmRegistration(username: string, code: string, callback) {
    const cognitoUser = new CognitoUser({Username: username, Pool: this.userPool})
    cognitoUser.confirmRegistration(code, true, callback)
  }

  getCurrentUser(): CognitoUser {
    return this.userPool.getCurrentUser()
  }

  login(username: string, password: string, callbacks) {
    const authData = {
      Username: username,
      Password: password
    }
    const authDetails = new AuthenticationDetails(authData)
    const userData = {
      Username: username,
      Pool: this.userPool
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authDetails, callbacks)
  }

  logout() {
    const cognitoUser = this.userPool.getCurrentUser()
    this.localStorageService.removeItem('conversations')
    cognitoUser.signOut()
  }
}
