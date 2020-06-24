import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  setUser = (user: any) => {
    localStorage.user = JSON.stringify(user);
  }

  clearAll = () => {
    localStorage.clear();
  }
  
}
