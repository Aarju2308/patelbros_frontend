import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BrandService } from '../../../apis/services';
import { PageResponseBrandResponse } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-brand-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './brand-list.component.html',
  styleUrl: './brand-list.component.scss'
})
export class BrandListComponent implements OnInit {

  brandsList : PageResponseBrandResponse = {}
  page = 0;
  size = 10;

  constructor(
    private brandService : BrandService,
    private router : Router,
    private tokenService : TokenService
  ){}

  ngOnInit(): void {
    this.getBrandsList()
  }

  getBrandLogo(logo:string|undefined):string|undefined{
    if(logo){
      return "data:image/jpg;base64,"+logo;
    }
    return "";
  }

  getBrandsList(){
    this.brandService.getBrandsPage({
      page : this.page,
      size : this.size
    }).subscribe({
      next:(res)=>{
        this.brandsList = res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  firstPage(){
    this.page=0;
    this.getBrandsList()
  }

  lastPage(){
    this.page = this.brandsList.totalPages as number -1;
    this.getBrandsList()
  }

  goToPage(page:number){
    this.page = page;
    this.getBrandsList()
  }

  nextPage(){
    this.page++
    this.getBrandsList()
  }

  previousPage(){
    this.page--
    this.getBrandsList()
  }

  delete(id: number|undefined,brand:string|undefined) {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (confirm("Are you sure to delete " + brand)) {
        this.brandService.deleteBrand({
          brandId : id as number
        }).subscribe({
          next:()=>{
            this.getBrandsList()
          },
          error:()=>{
            alert("Something Went Wrong")
          }
        })
      }
    }else{
      alert("You are in test environment. You cannot modify details");
    }
  }

  edit(brandId: number|undefined) {
    this.router.navigate(['admin','editBrand',brandId])
  }


}
