import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginData: any;
  submitted: any;

  constructor(private fb: FormBuilder, private router:Router, private localStorageService:LocalstorageService) { }

  ngOnInit() {
    this.createForm();
    this.submitted=false;
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.submitted=true;
    if(this.loginForm.valid){
      this.loginData = this.loginForm.value;
      console.log(this.loginData);
      this.submitted=false;
      this.localStorageService.setUser(this.loginData['username']);
      this.router.navigate(['/'])
      this.loginForm.reset();
    }
  }

}
