import { Component, OnInit } from '@angular/core';
import { AdminService, OrderService } from '../../../apis/services';
import { OrderDetailResponse, OrderRequest, PageResponseOrderResponse } from '../../../apis/models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  constructor(
    private adminService : AdminService
  ){}
  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList(){
    this.adminService.getOrdersPage({}).subscribe({
      next:(res)=>{
        this.orders = res;
      },
      error:(err)=>{
        alert(err.error.errorMessage);
      }
    })
  }

  orders : PageResponseOrderResponse = {};
  orderDetails : Array<OrderDetailResponse> = []; 
  showModal = false;
  page = 0;
  size = 10;
  orderStatus : Array<string> = ['PENDING', 'ACCEPTED' , 'PROCESSING' , 'SHIPPED' , 'OFD' , 'DELIVERED' , 'CANCELLED']

  firstPage(){
    this.page=0;
    this.getOrdersList();
  }

  lastPage(){
    this.page = this.orders.totalPages as number -1;
    this.getOrdersList();
  }

  goToPage(page:number){
    this.page = page;
    this.getOrdersList();
  }

  nextPage(){
    this.page++
    this.getOrdersList();
  }

  previousPage(){
    this.page--
    this.getOrdersList();
  }

  showDetails(orderDetails: Array<OrderDetailResponse>){
    this.orderDetails = orderDetails;
    this.showModal = true;
  }

  getImage(blobImage:string | undefined):string|undefined{
    if(blobImage){
      return "data:image/jpg;base64,"+blobImage;
    }
    return "";
  }

  orderReq : OrderRequest = {};

  changeOrderStatus(event:any,id:number){
    var select = event.target as HTMLSelectElement;
    var val = select.value;
    if(this.orderStatus.includes(val) && id != 0){
      this.orderReq.orderStatus = val as 'PENDING' | 'ACCEPTED' | 'PROCESSING' | 'SHIPPED' | 'OFD' | 'DELIVERED' | 'CANCELLED';
    
      this.adminService.updateOrderStatus({
        body : this.orderReq,
        orderId : id
      }).subscribe({
        next:(res)=>{
          this.getOrdersList();
        },
        error:(err)=>{
          alert(err.error.errorMessage);
        }
      })
    
    }
    console.log(this.orderReq)
  }

  // isActive(status: string): boolean {
  //   const currentIndex = this.orderStatus.indexOf(status as string);
  //   const statusIndex = this.orderStatus.indexOf(status);
  //   return statusIndex <= currentIndex;
  // }


}
