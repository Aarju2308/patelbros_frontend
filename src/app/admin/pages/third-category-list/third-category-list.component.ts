import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PublicService, ThirdCategoryService } from '../../../apis/services';
import { PageResponseThirdCategoryResponse } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-third-category-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './third-category-list.component.html',
  styleUrl: './third-category-list.component.scss'
})
export class ThirdCategoryListComponent implements OnInit {
  

  thirdCatList : PageResponseThirdCategoryResponse = {}
  page = 0;
  size = 10;

  constructor(
    private router : Router,
    private thirdCatService : ThirdCategoryService,
    private publicService : PublicService,
    private tokenService : TokenService
  ){}
  
  ngOnInit(): void {
   this.getAllThirdCategories()
  }


  addThirdCat() {
    this.router.navigateByUrl('admin/addThirdCategory');
  }

  getAllThirdCategories(){
    this.publicService.getAllThirdCategories({
      page : this.page,
      size : this.size
    }).subscribe({
      next:(res)=>{
        this.thirdCatList = res
      },
      error : (err)=>{
        console.log(err)

      }
    })
  }

  firstPage(){
    this.page=0;
    this.getAllThirdCategories()
  }

  lastPage(){
    this.page = this.thirdCatList.totalPages as number -1;
    this.getAllThirdCategories()
  }

  goToPage(page:number){
    this.page = page;
    this.getAllThirdCategories()
  }

  nextPage(){
    this.page++
    this.getAllThirdCategories()
  }

  previousPage(){
    this.page--
    this.getAllThirdCategories()
  }

  edit(thirdCatId : number | undefined){
    this.router.navigate(['admin','editThirdCategory',thirdCatId])
  }

  delete(thirdId : number | undefined, thirdCat : string | undefined){
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if (confirm(`Are you sure you want to delete ${thirdCat}`)) {
        this.thirdCatService.deleteThirdCategory({
          thirdCatId : thirdId as number
        }).subscribe({
          next:()=>{
            this.getAllThirdCategories()
          },
          error:(err)=>{
            alert("Something went wrong. Please try again.")
            console.log(err)
          }
        })
      }
    }else{
      alert("You are in test environment. You cannot modify details");
    }
  }


}
