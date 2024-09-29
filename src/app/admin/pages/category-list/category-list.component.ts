import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../services/token/token.service';
import { CategoryService, PublicService } from '../../../apis/services';
import { CategoryResponse, PageResponseCategoryResponse } from '../../../apis/models';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent implements OnInit{

  constructor(
    private router : Router,
    private catService : CategoryService,
    private publicService : PublicService,
    private tokenService : TokenService
  ){ }

  ngOnInit(): void {
    // console.log(this.tokenService.getUserEmail())
    this.getCatList();
  }

  catList : PageResponseCategoryResponse = {};
  page = 0;
  size = 10;


  getCatList(){
    this.publicService.getAllCategories({
      page : this.page,
      size : this.size
    }).subscribe({
      next : (res : PageResponseCategoryResponse)=>{
        this.catList = res;
        console.log(this.catList)
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }

  firstPage(){
    this.page=0;
    this.getCatList()
  }

  lastPage(){
    this.page = this.catList.totalPages as number -1;
    this.getCatList()
  }

  goToPage(page:number){
    this.page = page;
    this.getCatList()
  }

  nextPage(){
    this.page++
    this.getCatList()
  }

  previousPage(){
    this.page--
    this.getCatList()
  }

  deleteCat(id: number|undefined,category:string|undefined) {
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (confirm("Are you sure to delete " + category)) {
        this.catService.deleteCategory({
           catId : id as number
        }).subscribe({
          next:()=>{
            this.getCatList()
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

  editCat(catId: number|undefined) {
    this.router.navigate(['admin','editCategory',catId])
  }

}
