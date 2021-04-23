import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../types/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://v3uxo526e5.execute-api.eu-central-1.amazonaws.com/dev/users'

  constructor(private httpClient: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url)
  }
}
