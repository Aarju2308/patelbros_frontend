import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../apis/services';
import { CategoryRequest } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {

  isEditMode = false;
  catId = 0;
  isSuccess : boolean = false;
  error = false;
  errorMessage: Array<string>=[];

  constructor(
    private catService : CategoryService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tokenService : TokenService
  ){}
  
  ngOnInit(): void {
    const catId = this.activatedRoute.snapshot.params['catId'];
    if (catId) {
      this.isEditMode = true;
      this.catId = catId
      this.catService.getSingleCategory({
        catId
      }).subscribe({
        next : (res)=>{
          this.categoryReq.active = res.active;
          this.categoryReq.category = res.category as string;
        },
        error : (err)=>{
          alert(err.error.errorMessage);
          this.router.navigateByUrl('admin/categoryList')
        }
      })
    }
  }

  categoryReq : CategoryRequest = {
    active: false,
    category: ''
  };

  submitForm() {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (this.isEditMode) {
        this.catService.updateCategory({
          catId : this.catId,
          body : this.categoryReq
        }).subscribe({
          next : ()=>{
            this.isSuccess = true;
          },
          error:(err)=>{
            this.errorMessage = [];
            this.error = true;
            if (err.error.validationErrors) {
              this.errorMessage = err.error.validationErrors
            }else{
              this.errorMessage.push(err.error.errorMessage)
            }
          }
        })
      }else{
        console.log(this.categoryReq)
        this.catService.createCategory({
          body : this.categoryReq
        }).subscribe({
          next : (res)=>{
            this.isSuccess = true;
          },
          error:(err)=>{
            this.errorMessage = [];
            this.error = true;
            if (err.error.validationErrors) {
              this.errorMessage = err.error.validationErrors
            }else{
              this.errorMessage.push(err.error.errorMessage)
            }
          }
        })
      }
    }else{
      alert("You are in test environment. You cannot modify details");
      this.router.navigateByUrl('/admin')
    }
  }
}
