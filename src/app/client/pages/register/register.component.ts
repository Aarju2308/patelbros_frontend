import { Component } from '@angular/core';
import { RegistrationRequest } from '../../../apis/models';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../apis/services';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  constructor(
    private authService : AuthenticationService,
    private router : Router
  ){}
  
  registerRequest : RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  }

  error = false;
  errorMessage : Array<string> = [];
  // success = false;

  register(){
    this.authService.registerUser({
      body:this.registerRequest
    }).subscribe({
      next:()=>{
        alert("Registered Successfully! Please Verify Your Email");
        this.router.navigateByUrl('verify-account')
      },
      error:(err)=>{
        this.errorMessage = [];
        this.error = true;
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors;
        }else{
          this.errorMessage.push(err.error.errorMessage)
        }
        console.log(err)
      }
    })
  }
}
