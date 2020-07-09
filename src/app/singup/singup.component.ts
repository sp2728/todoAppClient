import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompleteService } from '../services/complete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  signupForm: FormGroup;
  signupData: any;
  submitted: any;
  error:any;
  confirmPasswordError= false;
  confirmPasswordErrorValue:any;

  constructor(private fb: FormBuilder, private completeService:CompleteService, private router:Router) { }

  ngOnInit() {
    this.createForm();
    this.submitted=false;
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.submitted=true;
    let confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value
  
    if(this.signupForm.valid){
      this.signupData = this.signupForm.value;
      if(!confirmPassword){
        this.confirmPasswordError= true;
        this.confirmPasswordErrorValue= "Confirm Password is required";
      }
      else if(this.signupData['password']!== confirmPassword){
        this.confirmPasswordError= true;
        this.confirmPasswordErrorValue= "Confirm Password should match with Password";
      }
      else{
        this.confirmPasswordError=false;
        this.completeService.postSignup(this.signupData).subscribe((res)=>{
          if(res['success']){
            this.router.navigate(['/']);
          }
          else{
            console.log(res['err']['name']);
            if(res['err']['name']==='UserExistsError'){
              this.error="Username already exists";
            }
            else{
              this.error="Invalid Registration";
            }
            this.signupForm.reset()
          }
        })
      }
    }
  }

}
