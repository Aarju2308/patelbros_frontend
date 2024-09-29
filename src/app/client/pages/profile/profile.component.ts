import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../apis/services';
import { UserRequest, UserResponse } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
  constructor(
    private userService : UserService,
    private tokenService : TokenService,
  ){}
  ngOnInit(): void {
    this.getUserDetails();
  }

  userDetails : UserResponse = {};
  userReq : UserRequest = {
    email: '',
    firstName: '',
    lastName: ''
  };
  isModelOpen = false;

  getUserDetails(){
    this.userService.getUserDetails({}).subscribe({
      next:(res)=>{
        this.userDetails = res;
        if (res) {
          this.userReq.firstName = this.userDetails.fullName?.split(" ").at(0) as string
          this.userReq.lastName = this.userDetails.fullName?.split(" ").at(1) as string
          this.userReq.email = this.userDetails.email as string
          this.userReq.phone = this.userDetails.phone
          this.selectedBackground = this.userDetails.background ? "data:image/jpg;base64," + this.userDetails.background: ''
          this.selectedrofile = this.userDetails.profile ? "data:image/jpg;base64," + this.userDetails.profile: ''
        }
      },
      error:(err)=>{
        alert(err.error.errorMessage);
      }
    })
  }

  updateDetails(){
    this.userService.updateUserDetails({
      body : this.userReq
    }).subscribe({
      next:(res)=>{
        if (this.profileSelected) {
          this.uploadProfile();
        }
        if (this.backgroundSelected) {
          this.uploadBackground();
        }
        this.isModelOpen = false;
        if (this.userDetails.email != this.userReq.email) {
          this.tokenService.removeToken()
        }
      },
      error:(err)=> {
        this.isError = true;
        this.errorMessage = [];
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors;
        }
        this.errorMessage.push(err.error.errorMessage);
      },
    })
  }

  isError = false;
  errorMessage : Array<string> = [];
  uploadedProfile : any;
  selectedrofile : string = "";
  profileSelected = false;
  uploadedBackground :any;
  selectedBackground :string ="";
  backgroundSelected = false;

  onProfileSelect(file:any){
    this.profileSelected = true;
    this.uploadedProfile = file.target.files[0];
    if (this.uploadedProfile) {
      const reader = new FileReader();
      reader.onload=()=>{
        this.selectedrofile = reader.result as string
      }
      reader.readAsDataURL(this.uploadedProfile);
    }
  }

  onBackgroundSelect(file:any){
    this.backgroundSelected = true;
    this.uploadedBackground = file.target.files[0];
    if (this.uploadedBackground) {
      const reader = new FileReader();
      reader.onload=()=>{
        this.selectedBackground = reader.result as string;
      }
      reader.readAsDataURL(this.uploadedBackground)
    }
  }

  uploadProfile(){
    this.userService.uploadProfiletImage({
      body : {
        file : this.uploadedProfile
      }
    }).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert(err.error.errorMessage);
      }
    })
  }

  uploadBackground(){
    this.userService.uploadBackgroundImage({
      body : {
        file : this.uploadedBackground
      }
    }).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{
        alert(err.error.errorMessage);
      }
    })
  }
}
