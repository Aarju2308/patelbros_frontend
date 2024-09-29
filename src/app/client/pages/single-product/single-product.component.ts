import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PublicService, UserService } from '../../../apis/services';
import { CartRequest, PageResponseProductResponse, ProductResponse } from '../../../apis/models';
import { RatingComponent } from '../../components/rating/rating.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TokenService } from '../../../services/token/token.service';
import { EventEmmiterService } from '../../../services/emmiter/event-emmiter.service';

@Component({
  selector: 'app-single-product',
  standalone: true,
  imports: [FormsModule,RatingComponent,CurrencyPipe,RouterModule,CommonModule],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {
  
  productId = 0;

  showReviews = false;

  productDetails : ProductResponse = {};
  relatedProducts : PageResponseProductResponse = {};

  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private publicService : PublicService,
    private userService : UserService,
    private tokenServ : TokenService,
    private eventEmmiter : EventEmmiterService
  ){}

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      this.refreshComponent(params)
    })
    const proId = this.activatedRoute.snapshot.params['productId'];
    if (proId) {
      this.productId = proId;
      this.cartRequest.productId = proId
      this.getSingleProductsData(proId);
      this.getRelatedProducts()

    }
    console.log(this.productDetails)
  }


  refreshComponent(param:any) {
    this.getSingleProductsData(param.productId);
    this.getRelatedProducts()
    this.cartRequest.productId = param.productId
  }
  
  getSingleProductsData(proId:number){
    this.publicService.getSinglePublicProduct({
      productId : proId
    }).subscribe({
      next:(res)=>{
        this.productDetails = res;
      },
      error:(err)=>{
        console.log(err);
        this.router.navigateByUrl('404')
      }
    })
  }

  getRelatedProducts(){
    if (this.productDetails) {
      this.publicService.getProductsPageByThirdCategories({
        body : [this.productDetails.thirdCategory?.id as number],
        page : 1,
        size : 4
      }).subscribe({
        next:(res)=>{
          this.relatedProducts = res
        },
        error:(err)=>{
          console.log(err)
          alert("Could not fetch related products");
        }
      })
    }
  }

  minusQty(){
    if (this.cartRequest.quantity!=1) {
      this.cartRequest.quantity--;
    }
  }

  addQty(){
    if (this.cartRequest.quantity<20) {
      this.cartRequest.quantity++;
    }
  }

  getImage(blobImage:string | undefined):string|undefined{
    if(blobImage){
      return "data:image/jpg;base64,"+blobImage;
    }
    return "";
  }

  cartRequest :CartRequest={
    productId: this.productId,
    quantity: 1
  }

  addToCart(){
    var tok = localStorage.getItem("TOKEN");
    //alert(this.cartRequest.quantity)
    if (tok) {
       this.addToCartUser();
    }else{
     this.addToCartPublic()
    }
    this.eventEmmiter.getCount();
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
      next:(res)=>{},
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
