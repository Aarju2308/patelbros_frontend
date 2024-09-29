import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BrandRequest } from '../../../apis/models';
import { BrandService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.scss'
})
export class AddBrandComponent implements OnInit {


  isSuccess : boolean | undefined;
  error = false;
  errorMessage : Array<string> = [];
  brandReq : BrandRequest = {
    active: false,
    brand: '',
  }
  isEditMode = false;
  brandId = 0
  selectedPicture : any ;
  brandLogo : any
  fileAdded = false;

  constructor(
    private brandService : BrandService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private tokenService : TokenService
  ){}


  ngOnInit(): void {
    const bId = this.activatedRoute.snapshot.params['brandId'];
    this.brandId = bId
    if (bId) {
      this.isEditMode = true;
      this.brandService.getSingleBrand({
        brandId : bId
      }).subscribe({
        next:(res)=>{
          this.brandReq.brand = res.brand as string
          this.brandReq.active = res.active as boolean
          this.selectedPicture = "data:image/jpg;base64,"+res.logo as string;
        },
        error:(err)=>{
          alert(err.error.errorMessage)
          this.router.navigateByUrl("admin/brandList")
        }
      })
    }
  }

  onFileSelect(event : any){
    this.fileAdded = true;
    this.brandLogo = event.target.files[0];
    if (this.brandLogo) {
      const reader = new FileReader();
      reader.onload=()=>{
        this.selectedPicture = reader.result as string
      }
      reader.readAsDataURL(this.brandLogo)
    }
  }

  submitForm(){
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (this.isEditMode) {
        this.brandService.updateBrand({
          body : this.brandReq,
          brandId : this.brandId
        }).subscribe({
          next:(res)=>{
            if (this.fileAdded) {
              this.uploadLogo(res);
            }
            this.isSuccess = true
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
      }else{
        this.brandService.addBrand({
          body: this.brandReq
        }).subscribe({
          next:(res : number)=>{
            this.uploadLogo(res);
          },
          error:(err)=>{
            this.error=true
            this.errorMessage=[]
            if(err.error.validationErrors){
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

  uploadLogo(res : number){
    this.brandService.uploadBrandLogo({
      brandId:res,
      body : {
        file : this.brandLogo
      }
    }).subscribe({
      next : ()=>{this.isSuccess = true},
      error:(err)=>{
        this.error=true; 
        console.log(err)
        this.errorMessage.push(err.error.errorMessage)}
    })
  }


}
