import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';
import { LoginRequest } from '../../../apis/models';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../../services/session-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(
    private authServ : AuthenticationService,
    private tokenServ : TokenService,
    private router : Router,
    private userService : UserService,
    private sessionStorageService : SessionStorageService
  ){}
  uniqueId : number | undefined;
  ngOnInit(): void {
    const tempId = this.sessionStorageService.getItem("UniqueId");
    if (tempId) {
      this.uniqueId = +tempId
    }
  }

  loginRequest : LoginRequest = {
    email: '',
    password: ''
  }
  errorMessage : Array<string> = [];
  error = false;

  

  login(){
   
   
    this.authServ.loginUser({
      body : this.loginRequest
    }).subscribe({
      next:(res)=>{
        this.tokenServ.setToken(res.jwt as string);
        // alert(unique)
        if (this.uniqueId) {
          this.userService.setUserToCart({
            uniqueId : this.uniqueId
          }).subscribe({
            next:()=>{},
            error:(err)=>{console.log(err)}
          })
        }
        alert("Logged in successfully");
        this.router.navigate(['']);
      },
      error:(err)=>{
        console.log(err)
        this.error = true;
        this.errorMessage = [];
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors
        }else{
          this.errorMessage.push(err.error.errorMessage)
        }
      }
    })
  }
}
