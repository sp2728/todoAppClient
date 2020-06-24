import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CompleteService {

  constructor(private http:HttpClient) { }

  postLogin(loginData:any){
    return this.http.post('login', loginData);
  }

  postSignup(signupData:any){
    return this.http.post('signup', signupData);
  }

  getLogout(){
    return this.http.get('logout');
  }

  getTodos(){
    return this.http.get('getTodos');
  }

  addTodo(todoData:any){
    return this.http.post('addTodo', todoData);
  }

  deleteTodo(id:any){
    return this.http.delete('deleteTodo/'+id);
  }

  triggerStatus(id:any, status:any){
    return this.http.put('triggerStatus/'+id, {status: status});
  }

}
 