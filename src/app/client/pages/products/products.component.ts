import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PublicService, UserService } from '../../../apis/services';
import { CartRequest, PageResponseProductResponse, ThirdCategoryResponse } from '../../../apis/models';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../components/rating/rating.component';
import { EventEmmiterService } from '../../../services/emmiter/event-emmiter.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RatingComponent,RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  thirdCatList : Array<ThirdCategoryResponse> = [];
  productsList : PageResponseProductResponse = {};
  thirdCatIdList : Array<number> = [];
  filter : number = 0;
  subCatId = 0;
  page = 0;
  size = 6;
  
  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private publicService : PublicService,
    private userService : UserService,
    private eventEmmiter : EventEmmiterService,
    private tokenServ : TokenService
  ){}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      // console.log('Route parameters changed', params);
      this.refreshComponent(params);
    });
    const subCatId = this.activatedRoute.snapshot.params['subCatId'];
    if (subCatId) {
      this.subCatId = subCatId;
      this.getAllThirdCategories(subCatId);
      this.getAllProductsBySubCategory(subCatId,this.filter);
      console.log(this.productsList)
    }else{
      this.router.navigate(['/404']);
    }
  }

  refreshComponent(param:any) {
    this.getAllThirdCategories(param.subCatId);
    this.getAllProductsBySubCategory(param.subCatId,this.filter);
  }
  

  getAllProductsBySubCategory(subCatId:number,filter:number){
    this.publicService.getProductsPageBySubCategory({
      subCatId : subCatId,
      page : this.page,
      size : this.size,
      filter:filter
    }).subscribe({
      next:(res)=>{
        this.productsList = res;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  getAllProductsByThirdCategories(thirdCats:Array<number>,filter:number){
    this.publicService.getProductsPageByThirdCategories({
      body : thirdCats,
      page : this.page,
      size : this.size,
      filter : filter
    }).subscribe({
      next:(res)=>{
        this.productsList = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  getAllThirdCategories(subCatId:number){
    this.publicService.getThirdCategoryBySubCategory({
      subCatId : subCatId
    }).subscribe({
      next:(res)=>{
        this.thirdCatList = res;
      },
      error:(err)=>{
        console.log(err)
        this.router.navigate(['/404']);
      }
    })
  }

  getImage(blobImage:string | undefined):string|undefined{
    if(blobImage){
      return "data:image/jpg;base64,"+blobImage;
    }
    return "";
  }

  goToPage(pg:number){
    this.page = pg;
    if (this.thirdCatIdList.length) {
      this.getAllProductsByThirdCategories(this.thirdCatIdList,this.filter) 
    }else{
      this.getAllProductsBySubCategory(this.subCatId,this.filter)
    }
  }

  nextPage(){
    this.page++;
    if (this.thirdCatIdList.length) {
      this.getAllProductsByThirdCategories(this.thirdCatIdList,this.filter) 
    }else{
      this.getAllProductsBySubCategory(this.subCatId,this.filter)
    }
  }

  addThirdCat(tc:number){
    const index = this.thirdCatIdList.indexOf(tc);
    this.page = 0;
    if (index > -1) {
      // If the element is found, remove it from the list
      this.thirdCatIdList.splice(index, 1);
    } else {
      // If the element is not found, add it to the list
      this.thirdCatIdList.push(tc);
    }
    console.log(this.thirdCatIdList);
    if (this.thirdCatIdList.length > 0) {
      this.getAllProductsByThirdCategories(this.thirdCatIdList,this.filter) 
    }else{
      this.getAllProductsBySubCategory(this.subCatId,this.filter)
    }
  }


  filterPoducts(event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const value = selectElement.value;
    console.log(value)
    if (value) {
      this.filter = +value; 
      if (this.thirdCatIdList.length) {
        this.getAllProductsByThirdCategories(this.thirdCatIdList,this.filter);
      }else{
        this.getAllProductsBySubCategory(this.subCatId,this.filter);
      }
    }
  }

  cartRequest :CartRequest={
    productId: 0,
    quantity: 1
  }

  addToCart(proId : number){
    if (proId != 0) {
      var tok = localStorage.getItem("TOKEN");
      this.cartRequest.productId = proId;
      if (tok) {
        this.addToCartUser();
      }else{
      this.addToCartPublic();
      }
      this.eventEmmiter.getCount();
    }else{
      alert("Product id is needed ");
    }
    
  }

  addToCartPublic(){

    var unique = sessionStorage.getItem("UniqueId");
    if (unique) {
      this.cartRequest.uniqueId = +unique;
      console.log(this.cartRequest);  
    }else{
      var tempId =Math.floor(10000 + Math.random() * 90000);
      sessionStorage.setItem("UniqueId",tempId.toString());
      this.cartRequest.uniqueId = tempId;
    } 

    this.publicService.addToCart1({
      body:this.cartRequest
    }).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:(err)=>{console.log(err)}
    })
  }

  addToCartUser(){
    this.userService.addToCart({
      body : this.cartRequest
    }).subscribe({
      next:()=>{
        // alert("success with USer : "+ res);
      },
      error:(err)=>{
        console.log(err);
        this.tokenServ.removeToken();
        this.addToCartPublic()
      }
    })
  }  

}
