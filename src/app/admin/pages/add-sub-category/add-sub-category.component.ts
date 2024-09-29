import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService, PublicService, SubCategoryService } from '../../../apis/services';
import { PageResponseCategoryResponse, SubCategoryRequest } from '../../../apis/models';
import { interval } from 'rxjs';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.scss'
})
export class AddSubCategoryComponent implements OnInit{
  
  isSuccess : boolean | undefined = undefined;
  error : boolean = false;
  errorMessage : Array<string> = [];
  isEditMode : boolean = false;
  subCatId = 0;
  catList : PageResponseCategoryResponse = {}

  subCatReq : SubCategoryRequest = {
    catId: 0,
    subCategory: ''
  }

  constructor(
    private subCatService : SubCategoryService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tokenService : TokenService,
    private publicService : PublicService
  ) {}

  ngOnInit(): void {

    this.publicService.getAllCategories({
      page : 0,
      size : 10
    }).subscribe({
      next:(res)=> {
          this.catList = res
      },
      error:(err)=>{
        console.log(err)
        alert("Unable to fetch Categories. Try Again")
      }
    })

    const subCatId = this.activatedRoute.snapshot.params['subCatId'];
    if (subCatId) {
      this.subCatId = subCatId
      this.isEditMode = true;
      this.subCatService.getSingleSubCategory({
        subCatId : subCatId
      }).subscribe({
        next : (res)=>{
          this.subCatReq.catId = res.category?.id as number
          this.subCatReq.active = res.active
          this.subCatReq.subCategory = res.subCategory as string
        },
        error:(err)=>{
          alert(err.err.errorMessage)
          this.router.navigateByUrl('admin/subCategoryList')
        }
      })
    }
  }

  submitForm(){
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (this.isEditMode) {
        this.subCatService.updateSubCategory({
          body : this.subCatReq,
          subCatId : this.subCatId
        }).subscribe({
          next : ()=>{
            this.isSuccess = true
            this.closeAlert();
          },
          error:(err)=>{
            this.errorMessage = [];
            this.error = true;
            if (err.error.validationErrors) {
              this.errorMessage = err.error.validationErrors;
            }else{
              this.errorMessage.push(err.error.errorMessage)
            }
          }
        })
      }else{
        this.subCatService.createSubCategory({
          body : this.subCatReq
        }).subscribe({
          next:()=>{
            this.isSuccess=true;
            this.closeAlert();
          },
          error:(err)=>{
            this.error=true
            this.errorMessage = []
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

  closeAlert(){
    var time = 0;
    var interval;
    if (this.isSuccess) {
      interval = setInterval(()=>{
        time++;
        if (time == 3) {
          this.isSuccess=false
          time = 0
        }
      },1000)
    }
  }

}
