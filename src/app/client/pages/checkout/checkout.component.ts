import { Component, OnInit } from '@angular/core';
import { AddressService, OrderService, PublicService } from '../../../apis/services';
import { Address, AddressRequest, CartRequest, City, Country, OrderRequest, PaypalResponse, State } from '../../../apis/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  constructor(
    private addressService : AddressService,
    private publicService : PublicService,
    private orderService : OrderService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ){}

  ngOnInit(): void {
    const payId = this.activatedRoute.snapshot.params['paymentId'];
    if (payId) {
      this.paymentId = payId;
    }
    this.getAllAddresses();
    this.getAllCountries()
  }

  getAllAddresses(){
    this.addressService.getAllAddress({}).subscribe({
      next:(res)=>{
        this.allAddress = res;
        if (this.allAddress.length<=0) {
          this.addNewAddress = true
        }
      },
      error:(err)=>{console.log(err)}
    })
  }

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
    var countryId;
    countryId = select.value
    this.publicService.getAllStatesByCountry({
      countryId : +countryId
    }).subscribe({
      next:(res)=>{this.states = res;},
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
  }

  addNewAddress = false;
  postCode : string | undefined;
  error =false;
  errorMessage : Array<string> = [];
  paymentId = "";

  orderReq : OrderRequest = {
    addressId: 0
  };


  countries : Array<Country> = [];
  states : Array<State> = [];
  cities : Array<City> = [];
  allAddress : Array<Address> = []
  addressReq : AddressRequest = {
    address: '',
    cityId: 0,
    firstName: '',
    lastName: ''
  };

  deleteAddress(id:number|undefined){
    if (confirm("Are you sure you want to delete address")) {
      this.addressService.deleteAddress({
        addressId : id!
      }).subscribe({
        next:()=>{
          this.getAllAddresses()
        },
        error:(er)=>{
          console.log(er);
          alert("Something went wrong");
        }
      })
    }
  }

  addAddress(){
    console.log(this.addressReq);
    this.addressService.addAddress({
      body : this.addressReq
    }).subscribe({
      next:()=>{
        this.addNewAddress = false;
      },
      error:(err)=>{
        this.errorMessage=[];
        this.error= true;
        if (err.error.validationErrors) {
          this.errorMessage = err.error.validationErrors;
        }else{
          this.errorMessage.push(err.error.errorMessage);
        }

        console.log(this.errorMessage)
      }
    })
  }

  placeOrder(){
    this.orderService.createOrder({
      body : this.orderReq,
      paymentId : this.paymentId
    }).subscribe({
      next:(res)=>{
       this.router.navigateByUrl('history');
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
}
