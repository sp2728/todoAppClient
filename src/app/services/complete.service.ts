import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CompleteService {

  constructor(private http:HttpClient) { }

  postLogin(loginData:any){
    return this.http.post(environment.backend_url+'login', loginData);
  }

  postSignup(signupData:any){
    return this.http.post(environment.backend_url+'signup', signupData);
  }

  getLogout(){
    return this.http.get(environment.backend_url+'logout');
  }

}
