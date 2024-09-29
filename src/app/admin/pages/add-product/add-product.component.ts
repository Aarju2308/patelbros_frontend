import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrandService, CategoryService, ProductService, PublicService, SubCategoryService, ThirdCategoryService } from '../../../apis/services';
import { BrandResponse, PageResponseCategoryResponse, PageResponseSubCategoryResponse, ProductRequest, ProductResponse, SubCategoryResponse, ThirdCategoryResponse } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  
  isSuccess : boolean | undefined;
  error:boolean=false;
  errorMessage : Array<string> = [];
  isEditMode = false;
  proId = 0
  productReq : ProductRequest = {
    brandId: 0,
    catId: 0,
    description: '',
    name: '',
    price: 0,
    subCatId: 0,
    thirdCategoryId: 0
  }
  selectedPicture="";
  uploadPicture:any;
  fileAdded = false


  catList : PageResponseCategoryResponse = {}
  subCatList : Array<SubCategoryResponse> =[]
  thirdCatList : Array<ThirdCategoryResponse> = []
  brandList : Array<BrandResponse> = []

  constructor(
    private productService : ProductService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tokenService : TokenService,
    private publicService : PublicService
  ){}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params['productId'];
    console.log(productId)
    if(productId){
      this.isEditMode = true;
      this.proId = productId
      this.productService.getSingleProduct({
        productId : productId
      }).subscribe({
        next:(res : ProductResponse)=>{
          console.log(res)
          this.productReq.catId = res.thirdCategory?.subCategory?.category?.id as number
          this.productReq.subCatId = res.thirdCategory?.subCategory?.id as number
          this.productReq.thirdCategoryId = res.thirdCategory?.id as  number
          this.productReq.brandId = res.brand?.id as number
          this.productReq.name = res.name as string
          this.productReq.price = res.price as number
          this.productReq.description = res.descrtiption as string
          this.selectedPicture = "data:image/jpg;base64," + res.image as string

          this.getSubCatList(this.productReq.catId);
          this.getThirdCatList(this.productReq.subCatId)
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }

    this.publicService.getAllCategories({}).subscribe({
      next:(res : PageResponseCategoryResponse)=>{
        this.catList = res
      }
    })

    this.publicService.getAllBrands().subscribe({next:(value) =>{
        this.brandList = value
    },})

  }

  submitForm() {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (this.isEditMode) {
        this.productService.updateProduct({
          body : this.productReq,
          productId : this.proId
        }).subscribe({
          next:(res)=> {
              if(this.fileAdded){
                this.uploadImage(res);
              }
              this.isSuccess = true;
              this.closeAlert();
          },
          error:(err)=>{
            this.error=true
            this.errorMessage=[]
            if (err.error.validationErrors) {
              this.errorMessage = err.error.validationErrors
            }else{
              this.errorMessage.push(err.error.errorMessage)
            }
          }
        })
      }else{
        this.productService.addProduct({
          body : this.productReq
        }).subscribe({
          next:(res)=>{
            this.uploadImage(res);
          },
          error:(err)=>{
            this.error=true
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

  getSubCatList(catId : number){
    this.publicService.getAllSubCategoriesByCategory({
      catId : catId
    }).subscribe({
      next:(res)=>{
        this.subCatList = res
      }
    })
  }

  getThirdCatList(subCatId : number){
    this.publicService.getThirdCategoryBySubCategory({
      subCatId : subCatId
    }).subscribe({
      next:(res)=>{
        this.thirdCatList = res
      },
      error:(err)=>{
        this.error=true;
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors
        }else{
          this.errorMessage.push(err.error.errorMessage)
        }
      }
    })
  }

  onFileSelect(event:any){
    this.fileAdded = true;
    this.uploadPicture = event.target.files[0];
    if (this.uploadPicture) {
      const reader = new FileReader();
      reader.onload=()=>{
        this.selectedPicture = reader.result as string
      }
      reader.readAsDataURL(this.uploadPicture)
    }
  }

  uploadImage(productId:number){
    this.productService.uploadProductImage({
      productId : productId,
      body:{
        file : this.uploadPicture
      }
    }).subscribe({
      next : ()=>{
        this.isSuccess = true;
        this.closeAlert();
      },
      error:(err)=>{
        this.error=true
        this.errorMessage.push("Product Added Successfully But Image Not.")
        this.errorMessage.push(err.error)
      }
    })
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
