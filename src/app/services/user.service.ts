import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://v3uxo526e5.execute-api.eu-central-1.amazonaws.com/dev/users/'

  constructor(private httpClient: HttpClient) {
  }

  /**
   * @param searchQuery - User search query
   */
  list(searchQuery: string): Observable<any[]> {
    return this.httpClient.get<string[]>(this.url, {params: {search: searchQuery}})
  }

  updatePreferences(username, preferences): Observable<any> {
    return this.httpClient.patch(this.url + username + '/preferences', preferences)
  }
}
