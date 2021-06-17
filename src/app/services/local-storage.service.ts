import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }
  setItem (key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  getItem (key: string): any {
    const string = localStorage.getItem(key)
    return JSON.parse(string)
  }
  removeItem (key: string) {
    localStorage.removeItem(key)
  }
}
