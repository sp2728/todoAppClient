import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.todoList = [{ 'todoValue': 'Go to work', 'priority': 'High', 'category': 'Work', 'status': 'Complete' }];
    this.createForm();
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
}
