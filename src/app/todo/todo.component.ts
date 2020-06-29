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
  todoList = [];
  submitted: any;
  date:any;
  user: any;
  error: any;
  num:any;

  constructor(private fb: FormBuilder, private localStorageService: LocalstorageService, private completeService: CompleteService, private router: Router) { }

  ngOnInit() {
    this.getTodos();
    this.createForm();
    this.user = this.localStorageService.getUser();
    this.num=1;
    this.date = new Date().toLocaleDateString('en-CA');
    this.submitted = false;
  }

  createForm() {
    this.todoForm = this.fb.group({
      activity: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      category: ['', [Validators.required]],
      time: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.valid && this.user) {
      this.error="";
      this.todoData = this.todoForm.value;
      this.completeService.addTodo(this.todoData).subscribe((res) => {
        if (res['success']) {
          this.submitted = false;
          this.getTodos();
          this.todoForm.reset()
        }
      })
    }
    else if(!this.user){
      this.error = "Please Log in"
    }
  }

  getTodos() {
    this.completeService.getTodos().subscribe((res) => {
      this.todoList = res['todos']
    })
  }


  filter(num:any){
    this.num=num;
    if(this.num==1){
      this.getTodos();
    }
    else if(this.num==2){
      this.completeService.getTodos().subscribe((res)=>{
        this.todoList = res['todos'].filter(todo=> todo.status== "Incomplete");
      })    } 
    else{
      this.completeService.getTodos().subscribe((res)=>{
        this.todoList = res['todos'].filter(todo=> todo.status== "Complete");
      })
    }
  }

  dateFilter(event:any){
    console.log(new Date(event.target.value));
  }

  triggerStatus(todo: any) {
    this.completeService.triggerStatus(todo._id, todo.status).subscribe((res) => {
      if (res['success']) {
        this.getTodos();
      }
    })
  }
  
  deleteTodo(id: any) {
    this.completeService.deleteTodo(id).subscribe((res) => {
      if (res['success']) {
        console.log(res);
        this.getTodos();
      }
    })
  }
}

   // this.todoList.splice(this.todoList.findIndex(function (i) {
    //   return i['todoValue'] === item['todoValue'];
    // }), 1);
  // completeTodo(item: any) {
  //   let todo = this.todoList.find(obj => obj['activity'] == item['activity']);
  //   console.log(todo['status'])
  //   todo['status'] = "Complete"
  // }
  // inCompleteTodo(item: any) {
  //   let todo = this.todoList.find(obj => obj['activity'] == item['activity']);
  //   todo['status'] = "Incomplete"
  // }