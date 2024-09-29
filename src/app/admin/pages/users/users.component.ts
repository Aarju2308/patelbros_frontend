import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../apis/services';
import { PageResponseUserResponse, UserRequest } from '../../../apis/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  
  constructor(
    private adminService : AdminService,
    private router : Router,
    private tokenService : TokenService
  ){}
  ngOnInit(): void {
    this.getAllUsers();
  }

  users : PageResponseUserResponse = {};
  userReq : UserRequest = {
    email: '',
    firstName: '',
    lastName: ''
  };
  page = 0;
  size = 10;

  getAllUsers(){
    this.adminService.getUsersPage({}).subscribe({
      next:(res)=>{
        this.users = res;
      },
      error:(err)=>{
        alert(err.error.errorMessage)
      }
    })
  }


  firstPage(){
    this.page=0;
    this.getAllUsers();
  }

  lastPage(){
    this.page = this.users.totalPages as number -1;
    this.getAllUsers();
  }

  goToPage(page:number){
    this.page = page;
    this.getAllUsers();
  }

  nextPage(){
    this.page++
    this.getAllUsers();
  }

  previousPage(){
    this.page--
    this.getAllUsers();
  }



  changeStatus(id:number,field:string,status:boolean){
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (confirm(`Are you sure you want to update users ${field} status to ${status} ?`)) {
        if (id != 0) {
          if (field == "locked") {
            this.userReq.locked = status;
          }
          if (field == "active") {
            this.userReq.active = status;
          }
          this.adminService.updateUserStatus({
            userId : id,
            body : this.userReq
          }).subscribe({
            next:()=>{
              this.getAllUsers();
            },
            error:(err)=>{
              alert(err.error.errorMessage)
            }
          })
        }
      }
    }else{
      alert("You are in test environment. You cannot modify details");
      this.router.navigateByUrl('/admin')
    }
  }

}
