import { Component } from '@angular/core';
import { LoginRequest, LoginResponse } from '../../../apis/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService : AuthenticationService,
    private tokenService : TokenService,
    private router : Router
  ) { }

  authRequest : LoginRequest = {
    email: '',
    password: ''
  };

  errMsg : Array<string> = [];

  testAccount(){
    this.authRequest.email = "admin@admin.com";
    this.authRequest.password = "admin@123";
  }

  login() {
    this.errMsg = []
    this.authService.loginUser({
      body : this.authRequest
    }).subscribe({
      next : (res : LoginResponse)=>{
        // console.log(res.jwt)
        this.tokenService.setToken(res.jwt as string)
        alert("Logged In Successfully")
        this.router.navigateByUrl('admin')
      },error : (err) =>{
        console.log(err)
        if (err.error.validationErrors) {
          this.errMsg = err.error.validationErrors
        }else{
          this.errMsg.push(err.error.errorMessage)
        }
      }
    })
  }
}
