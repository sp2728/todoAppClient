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
  loading:any;
  confirmPasswordError= false;
  confirmPasswordErrorValue:any;
  agreementError = false;

  constructor(private fb: FormBuilder, private completeService:CompleteService, private router:Router) { }

  ngOnInit() {
    this.createForm();
    this.submitted=false;
    this.loading=false;
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  checkPasswordConfirmation(password:any, confirmPassword:any){
    if(!confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password is required";
      return false;
    }
    else if(this.signupData['password']!== confirmPassword){
      this.confirmPasswordError= true;
      this.confirmPasswordErrorValue= "Confirm Password should match with Password";
      return false;
    }
    else{
      this.confirmPasswordError=false;
      return true;
    }
  }

  onSubmit(){
    this.submitted=true;

    //Agreement confirmation
    this.agreementError=false;
    let agreement  = (document.getElementById('agreement') as HTMLInputElement).checked
    if(!agreement){
      this.agreementError= true;
    }

    //Password Confirmation
    this.signupData = this.signupForm.value;
    let confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value
    let passwordCheck= this.checkPasswordConfirmation(this.signupData['password'],confirmPassword)

    //Submitting the form
    if(this.signupForm.valid && passwordCheck && agreement){
      this.loading =true;
        this.completeService.postSignup(this.signupData).subscribe((res)=>{
          if(res['success']){
            this.router.navigate(['/']);
          }
          else{
            if(res['err']['name']==='UserExistsError'){
              this.error="Username already exists";
            }
            else{
              this.error="Invalid Registration";
            }
            this.loading = false;
            this.signupForm.reset()
          }
        })  
    }
    //end
  }

}
