import { CommonModule } from '@angular/common';
import { Component, OnInit, numberAttribute } from '@angular/core';
import { PageResponseSubCategoryResponse } from '../../../apis/models';
import { PublicService, SubCategoryService } from '../../../apis/services';
import { Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-sub-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sub-category-list.component.html',
  styleUrl: './sub-category-list.component.scss'
})
export class SubCategoryListComponent implements OnInit{


  constructor(
    private subCatService : SubCategoryService,
    private router : Router,
    private publicService : PublicService,
    private tokenService : TokenService
  ){}

  subCatList : PageResponseSubCategoryResponse = {};
  page = 0;
  size = 10;

  ngOnInit(): void {
    this.getAllSubCategories();
  }


  getAllSubCategories(){
    this.publicService.getSubCategyPage({
      page : this.page,
      size : this.size
    }).subscribe({
      next : (res)=>{
        this.subCatList = res
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }


  firstPage(){
    this.page=0;
    this.getAllSubCategories()
  }

  lastPage(){
    this.page = this.subCatList.totalPages as number -1;
    this.getAllSubCategories()
  }

  goToPage(page:number){
    this.page = page;
    this.getAllSubCategories()
  }

  nextPage(){
    this.page++
    this.getAllSubCategories()
  }

  previousPage(){
    this.page--
    this.getAllSubCategories()
  }

  edit(subCatId : number | undefined){
    this.router.navigate(['admin','editSubCategory',subCatId])
  }

  delete(subCatId : number | undefined, subCategory : string | undefined){
    if (this.tokenService.getUserEmail() != "admin@admin.com") {
      if(confirm(`Are You Sure you want to delete ${subCategory}`)){
        this.subCatService.deleteSubCategory({
          subCatId : subCatId as number
        }).subscribe({
          next : ()=>{
            this.getAllSubCategories
          },error : (err)=>{
            console.log(err);
            alert("Something went wrong")
          }
        })
      }
    }else{
      alert("You are in test environment. You cannot modify details");
    }
  }

  addSubCat() {
    this.router.navigate(['admin/addSubCategory'])
  }
}