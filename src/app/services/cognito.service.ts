import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {CognitoUser, CognitoUserAttribute, CognitoUserPool, AuthenticationDetails} from "amazon-cognito-identity-js";
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

  /**
   * Sign a user up
   * @param username
   * @param email
   * @param password
   * @param callback
   */
  signUp(username: string, email: string, password: string, callback) {
    const cognitoUserEmail = new CognitoUserAttribute({
      Name: 'email',
      Value: email
    })
    this.userPool.signUp(username, password, [cognitoUserEmail], null, callback)
  }

  /**
   * Confirms a registration verification code
   * @param username
   * @param code
   * @param callback
   */
  confirmRegistration(username: string, code: string, callback) {
    const cognitoUser = new CognitoUser({Username: username, Pool: this.userPool})
    cognitoUser.confirmRegistration(code, true, callback)
  }

  /**
   * Resends a registration verification code
   */
  resendVerificationCode () {
    // TODO: implement
  }

  /**
   * Get the current logged in user. Null if logged out
   */
  getCurrentUser (): CognitoUser {
    return this.userPool.getCurrentUser()
  }

  /**
   * Logs a user in
   * @param username
   * @param password
   * @param callbacks
   */
  login (username: string, password: string, callbacks) {
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

  /**
   * Logs a user out
   */
  logout () {
    const cognitoUser = this.userPool.getCurrentUser()
    this.localStorageService.removeItem('conversations')
    cognitoUser.signOut()
  }
}
