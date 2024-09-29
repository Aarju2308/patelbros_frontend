import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PageResponseProductResponse } from '../../../apis/models';
import { ProductService, PublicService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  productsList : PageResponseProductResponse = {}
  page = 0;
  size = 10;

  constructor(
    private productService : ProductService,
    private router : Router,
    private publicService : PublicService,
    private tokenService : TokenService
  ){}
  
  ngOnInit(): void {
    this.getProductsList()
  }

  getProductsList(){
    this.publicService.getProductPage({
      page : this.page,
      size : this.size
    }).subscribe({
      next:(res)=>{
        this.productsList = res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  firstPage(){
    this.page=0;
    this.getProductsList()
  }

  lastPage(){
    this.page = this.productsList.totalPages as number -1;
    this.getProductsList()
  }

  goToPage(page:number){
    this.page = page;
    this.getProductsList()
  }

  nextPage(){
    this.page++
    this.getProductsList()
  }

  previousPage(){
    this.page--
    this.getProductsList()
  }

  delete(id: number|undefined,product:string|undefined) {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (confirm("Are you sure to delete " + product)) {
        this.productService.deleteProduct({
          productId : id as number
        }).subscribe({
          next:()=>{
            this.getProductsList()
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

  edit(productId: number|undefined) {
    this.router.navigate(['admin','editProduct',productId])
  }

}
