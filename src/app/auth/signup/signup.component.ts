import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  error:string = null;
  isLoading=false;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }
  onSignup(form:NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    
    this.isLoading= true;
    this.authService.signup(email,password).subscribe(
    resData=>{
      console.log(resData);
      this.isLoading= false;
      this.router.navigate(['/search']);
    },
    errorMessage=>{
      this.error = errorMessage;
      this.isLoading= false;
    })

    form.reset();
  }
}
