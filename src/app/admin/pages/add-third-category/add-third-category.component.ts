import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageResponseCategoryResponse, SubCategoryResponse, ThirdCategoryRequest, ThirdCategoryResponse } from '../../../apis/models';
import { CategoryService, PublicService, SubCategoryService, ThirdCategoryService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-add-third-category',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './add-third-category.component.html',
  styleUrl: './add-third-category.component.scss'
})
export class AddThirdCategoryComponent implements OnInit {

  isSuccess : boolean | undefined;
  error : boolean = false
  errorMessage : Array<string> = []
  isEditMode = false;
  thirdCatReq : ThirdCategoryRequest = {
    catId: 0,
    subCatId: 0,
    thirdCategroy: ''
  }
  thirdCatId = 0;

  catList : PageResponseCategoryResponse = {}
  subCatList : Array<SubCategoryResponse> = [];


  constructor(
    private router : Router,
    private thirdCatServ : ThirdCategoryService,
    private tokenService : TokenService,
    private activatedRoute : ActivatedRoute,
    private publicService : PublicService
  ){}

  ngOnInit(): void {
      this.publicService.getAllCategories({}).subscribe({
        next:(res)=>{
          this.catList = res
        },
        error:(err)=>{
          alert("Unable To fetch Categories")
        }
      });

      const thirdCat = this.activatedRoute.snapshot.params['thirdCatId'];
      if (thirdCat) {
        this.isEditMode = true;
        this.thirdCatId = thirdCat

        this.thirdCatServ.getSingleThirdCat({
          thirdCatId : thirdCat
        }).subscribe({
          next : (res : ThirdCategoryResponse)=>{

            this.publicService.getAllSubCategoriesByCategory({
              catId : res.subCategory?.category?.id as number
            }).subscribe({
              next:(res)=>{
                this.subCatList = res
              }
            })

            this.thirdCatReq.catId = res.subCategory?.category?.id as number
            this.thirdCatReq.subCatId = res.subCategory?.id as number
            this.thirdCatReq.thirdCategroy = res.thirdCategory as string
            this.thirdCatReq.active = res.active
          },
          error:(err)=>{
            alert(err.error.errorMessage);
            this.router.navigateByUrl('admin/thirdCategoryList')
          }
        })
      }
  }

  getSubCatList(catId: number) {
    this.publicService.getAllSubCategoriesByCategory({
      catId : catId
    }).subscribe({
      next : (res)=>{
        this.subCatList = res
      },
      error:(err)=>{
        alert(err.error.errorMessage)
      }
    })
  }

  submitForm() {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (this.isEditMode) {
        this.thirdCatServ.updateThirdCategory({
          body : this.thirdCatReq,
          thirdCatId : this.thirdCatId
        }).subscribe({
          next : ()=>{
            this.isSuccess = true;
            this.closeAlert()
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
      }else{
        this.thirdCatServ.save({
          body:this.thirdCatReq
        }).subscribe({
          next:()=>{
            this.isSuccess = true;
            this.closeAlert()
          },
          error:(err)=>{
            this.error = true
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
          this.isSuccess = false;
          time = 0;
        }
      },1000)
    }
  }

}
