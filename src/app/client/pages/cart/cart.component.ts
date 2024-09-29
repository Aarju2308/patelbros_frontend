import { Component, OnInit } from '@angular/core';
import { CartRequest, CartResponse, City, Country, OrderRequest, PaypalResponse, State } from '../../../apis/models';
import { OrderService, PublicService, UserService } from '../../../apis/services';
import { TokenService } from '../../../services/token/token.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterModule,CurrencyPipe,CommonModule,FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  constructor(
    private publicService : PublicService,
    private userService : UserService,
    private tokenService : TokenService,
    private orderService : OrderService,
    private router : Router
  ){}

  ngOnInit(): void {
    var tok = localStorage.getItem("TOKEN");
    if (tok) {
       this.getCartByUser();
    }else{
     this.getCartByPublic();
    }
    this.getAllCountries();
  }
  cartResponse : Array<CartResponse> = [];
  error = false;
  noUniqueId = false;
  subTotal =0;
  deliveryCharges = 0;
  total = 0;
  postCode : string | undefined;
  paymentReq : OrderRequest = {
    addressId : 0
  };
  showPaymentModal = false;

  countries : Array<Country> = [];
  states : Array<State> = [];
  cities : Array<City> = [];

  getAllCountries(){
    this.publicService.getAllCountries({}).subscribe({
      next:(res)=>{this.countries = res},
      error:(err)=>{console.log(err)}
    })
  }
  getAllStatesByCountry(event:any){
    this.states = [];
    this.cities = [];
    const select = event.target as HTMLSelectElement;
    const countryId = select.value
    this.publicService.getAllStatesByCountry({
      countryId : +countryId
    }).subscribe({
      next:(res)=>{this.states = res;console.log(this.states,countryId)},
      error:(err)=>{console.log(err)}
    })
  }
  getAllCitiesByState(event:any){
    this.cities = [];
    const select = event.target as HTMLSelectElement;
    const stateId = select.value
    this.publicService.getAllCitiesByState({
      stateId : +stateId
    }).subscribe({
      next:(res)=>{this.cities = res},
      error:(err)=>{console.log(err)}
    })
  }

  getCityInfo(event:any){
    const select = event.target as HTMLSelectElement;
    const cityId = select.value;
    var c : City = {};
    this.cities.forEach(city=>{
      if (city.id! == +cityId) {
        c = city
      }
    })
    this.postCode = c.pinCode!;
    this.deliveryCharges = c.estimatedShippingCost!;
    this.getSubTotal()
  }

  getCartByUser(){
    this.userService.getCartByUser({}).subscribe({
      next:(res)=>{
        this.cartResponse = res;
        this.getSubTotal();
        // console.log(res);
      },
      error:(err)=>{
        console.log(err);
        this.tokenService.removeToken();
        this.getCartByPublic();
      }
    })
  }

  getCartByPublic(){
    var unique = sessionStorage.getItem("UniqueId");
    if (unique) {
      console.log(unique);
      this.publicService.getCartByUniqueId({
        uniqueId : +unique
      }).subscribe({
        next:(res)=>{
          console.log(res)
          this.cartResponse = res;
          this.getSubTotal();
        },
        error:(err)=>{
          this.error=true;
          alert("Something Went Wrong");
          console.log(err)
        }
      })
    }else{
      this.noUniqueId = true
    }
  }

  getImage(blobImage:string | undefined):string|undefined{
    if(blobImage){
      return "data:image/jpg;base64,"+blobImage;
    }
    return "";
  }

  getSubTotal(){
    this.subTotal=0;
    for (const cart of this.cartResponse) {
      this.subTotal += cart.total || 0
    }
    this.total = this.subTotal + this.deliveryCharges;
  }

  minusQty(cart:CartResponse){
    var qty = cart.quantity!;
    var tok = localStorage.getItem("TOKEN");
    
    if (tok) {
      if (qty > 1) {
        var req : CartRequest = {
          productId: cart.product?.id!,
          quantity: 1
        };
        this.removeFromCart(req);
      }
    }else{
      alert("You need to login to subtract cart value");
      this.router.navigateByUrl("/login");
    }
    
  }

  addQty(cart:CartResponse){
    var req : CartRequest = {
      productId: cart.product?.id!,
      quantity: 1
    };
    this.addToCart(req);
  }

  addToCart(cartRequest : CartRequest){
    var tok = localStorage.getItem("TOKEN");
    
    if (tok) {
      this.addToCartUser(cartRequest);
    }else{
     this.addToCartPublic(cartRequest);
     this.getCartByPublic();
    }
  }

  removeFromCart(cartRequest : CartRequest){
    this.userService.removeQuantityFromCart({
      body : cartRequest
    }).subscribe({
      next:()=>{
        this.getCartByUser()
      },
      error:(err)=>{console.log(err)}
    })
  }

  addToCartPublic(cartRequest : CartRequest){

    var unique = sessionStorage.getItem("UniqueId");
    if (unique) {
      cartRequest.uniqueId = +unique;
     
    }else{
      var tempId =Math.floor(10000 + Math.random() * 90000);
      sessionStorage.setItem("UniqueId",tempId.toString());
      cartRequest.uniqueId = tempId;
    } 

    this.publicService.addToCart1({
      body:cartRequest
    }).subscribe({
      next:(res)=>{alert("success with Public : "+ res);},
      error:(err)=>{console.log(err)}
    })
  }

  addToCartUser(cartRequest : CartRequest){
    this.userService.addToCart({
      body : cartRequest
    }).subscribe({
      next:()=>{
        this.getCartByUser();
      },
      error:(err)=>{
        console.log(err);
        this.tokenService.removeToken();
        this.addToCartPublic(cartRequest)
      }
    })
  }  

  deleteCart(cartId : number | undefined,name:string | undefined){
    if (cartId) {
      if(confirm(`Are you sure you want to remove ${name} from cart`)){
        this.userService.deleteCart({
          cartId : cartId
        }).subscribe({
          next:()=>{
            this.getCartByUser()
          },
          error:(err)=>{
            alert("Something went wrong");
            console.log(err)
          }
        })
      }
    }
  }

  checkout(){
    const tok = localStorage.getItem("TOKEN")
    if (tok) {
      
      if (this.paymentReq.addressId != 0) {
        // alert(this.paymentReq.addressId)
        this.orderService.payForOrder({
          body : this.paymentReq
        }).subscribe({
          next:(res:PaypalResponse)=>{
            if (res.url) {
              this.showPaymentModal = true;
              window.location.href = res.url
            }
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }else{
        alert("Please select city to calculate shipping charges.")
      }
      // this.router.navigateByUrl("/checkout");

    }else{
      alert("Please Login First");
      this.router.navigateByUrl("/login")
    }
  }
  

}
