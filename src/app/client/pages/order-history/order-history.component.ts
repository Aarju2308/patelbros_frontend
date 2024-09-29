import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../apis/services';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { OrderResponse } from '../../../apis/models';
import { routes } from '../../../app.routes';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [DatePipe,CurrencyPipe,RouterModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss'
})
export class OrderHistoryComponent implements OnInit {
  
  orders : Array<OrderResponse>  = [];

  constructor(
    private orderService : OrderService,
    private router : Router
  ){}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.orderService.getAllOrders({})
    .subscribe({
      next:(res)=>{
        this.orders = res
      },
      error:(err)=>{
        console.log(err);
        // alert("Please Login To view your orders");
        // this.router.navigateByUrl("/login")
      }
    })
  }

}
