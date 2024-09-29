import { Component, OnInit } from '@angular/core';
import { CategoryResponse, PageResponseCategoryResponse, ProductResponse, SubCategoryResponse } from '../../../apis/models';
import { PublicService, UserService } from '../../../apis/services';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventEmmiterService } from '../../../services/emmiter/event-emmiter.service';
import { TokenService } from '../../../services/token/token.service';
import { SessionStorageService } from '../../../services/session-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  catList : PageResponseCategoryResponse = {}
  subCatList : Array<SubCategoryResponse> =[];
  productsList : Array<ProductResponse> = [];
  searchTerm = "";
  productsInCart = 0;
  showUser = false;
  showSideNav = false;
  showSideCat = false;
  // showSideSubCat = false;
  showSideSubCat: boolean[] = [];

  isTokenValid = false;
  
  constructor(
    private publicService : PublicService,
    private router : Router,
    private eventEmmiter : EventEmmiterService,
    private userService : UserService,
    private tokenService : TokenService,
    private sessionService : SessionStorageService
  ){}

  ngOnInit(): void {
    this.eventEmmiter.getCartCount.subscribe(()=>{
      this.getCartCount();
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getCartCount();  
      }
    });
    this.publicService.getAllCategories().subscribe({next:(res)=>{this.catList=res}});
    this.publicService.getAllSubCategories().subscribe({next:(res)=>{this.subCatList = res}});
    this.isTokenValid = this.tokenService.isTokenValid();
  }

  logout(){
    this.tokenService.removeToken();
    this.router.navigateByUrl('/')
  }
  
  getCartCount(){
    var tok = localStorage.getItem("TOKEN");
    if (tok) {
       this.getCartCountWithUser();
    }else{
     this.getCartCountWithUniqueId()
    }
  }

  getCartCountWithUser(){
    this.userService.getCartCountByUser({}).subscribe({
      next:(value)=> {
          this.productsInCart = value
      },
      error:()=>{
        this.tokenService.removeToken();
        this.getCartCountWithUniqueId();
      }
    })
  }

  getCartCountWithUniqueId(){
    var sessionId = this.sessionService.getItem("UniqueId");
    if (sessionId) {
      this.publicService.getCartCountByUniqueId({
        uniqueId : +sessionId
      }).subscribe({
        next:(res)=>{
          this.productsInCart = res;
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }else{
      console.log("No Unique Id Found in Session")
    }
  }

  toProducts(subCatId: number|undefined) {
    this.router.navigate(['products',subCatId])
  }

  searchProducts(){
    this.productsList = []
    if (this.searchTerm) {
      this.publicService.searchProducts({
        name : this.searchTerm
      }).subscribe({
        next : (res)=>{
          this.productsList = res;
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }
}
