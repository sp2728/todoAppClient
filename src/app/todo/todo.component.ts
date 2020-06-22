import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from '../services/localstorage.service';
import { Router } from '@angular/router';
import { CompleteService } from '../services/complete.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  @ViewChild('fform') todoFormDirective;
  todoForm: FormGroup;
  todoData: any;
  todoList: any
  date: any;
  submitted: any;
  user:any;
  error:any;

  constructor(private fb: FormBuilder, private localStorageService:LocalstorageService, private completeService:CompleteService, private router:Router) { }

  ngOnInit() {
    this.todoList = [{ 'todoValue': 'Go to work', 'priority': 'High', 'category': 'Work', 'status': 'Complete' }];
    this.createForm();
    this.user = this.localStorageService.getUser();
    this.date = new Date()
    this.submitted = false;
  }

  createForm() {
    this.todoForm = this.fb.group({
      todoValue: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      category: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid) {
      this.todoData = this.todoForm.value;
      this.todoData['status'] = "Incomplete"
      console.log(this.todoData);
      this.todoList.push(this.todoData);
      this.submitted = false;
      this.todoForm.reset()
    }
  }

  loginCheck(){
    if(!this.user){
      this.router.navigate(['/login']);
    }
  }

  completeTodo(item: any) {
    let todo = this.todoList.find(obj => obj['todoValue'] == item['todoValue']);
    console.log(todo['status'])
    todo['status'] = "Complete"
  }

  inCompleteTodo(item: any) {
    let todo = this.todoList.find(obj => obj['todoValue'] == item['todoValue']);
    todo['status'] = "Incomplete"
  }

  deleteTodo(item: any) {
    this.todoList.splice(this.todoList.findIndex(function (i) {
      return i['todoValue'] === item['todoValue'];
    }), 1);
  }

  logout(){
    this.completeService.getLogout().subscribe((res)=>{
      if(res['success']){
        this.localStorageService.clearAll();
        console.log('Successfully logged out');
        this.router.navigate(['/login']);
      }
    })
  }
}
