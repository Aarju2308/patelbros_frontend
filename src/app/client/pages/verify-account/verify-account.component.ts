import { Component, OnInit } from '@angular/core';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { AuthenticationService } from '../../../apis/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  standalone: true,
  imports: [CodeInputModule],
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.scss'
})
export class VerifyAccountComponent implements OnInit{

  error = false;
  errorMessage : Array<string> = [];
  constructor(
    private authService : AuthenticationService,
    private activatedRoute :ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    console.log(queryParams)
    if ("validatinOtp" in queryParams) {
      this.verifyAccount(queryParams['validatinOtp'] as string);
    }
  }

  onCodeCompleted(code: string) {
    this.verifyAccount(code);
  }

  verifyAccount(code:string){
    this.authService.verifyUser({
      token : code
    }).subscribe({
      next:(res)=>{
        console.log(res),
        this.router.navigateByUrl("/");
      },
      error:(err)=>{
        this.error = true;
        this.errorMessage.push(err.error.errorMessage)
        console.log(err);
      }
    })
  }

}
