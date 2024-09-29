import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../apis/services';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from '../../../apis/models';
import { TokenService } from '../../../services/token/token.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './track-order.component.html',
  styleUrl: './track-order.component.scss'
})
export class TrackOrderComponent implements OnInit{
  
  constructor(
    private orderService : OrderService,
    private activatedRoute : ActivatedRoute,
    private tokenServ : TokenService,
    private router : Router
  ){}
  ngOnInit(): void {
    const billNo = this.activatedRoute.snapshot.params['billNo'];
    this.getOrderDetails(billNo);
  }

  order : OrderResponse = {}
  currentStatus : string = "";
  expectedArrival : string | undefined = "";


  getOrderDetails(billNo : string){
    this.orderService.getSingleOrder({
      billNo : billNo
    }).subscribe({
      next:(res)=>{
        this.order = res;
        this.currentStatus = res.status as string;
        this.expectedArrival = this.order.issuedAt
      },
      error:(err)=>{
        alert(err.error.errorMessage);
        this.tokenServ.removeToken();
        this.router.navigateByUrl("/login")
      }
    })
  }

  statuses = ['ACCEPTED', 'PROCESSING', 'SHIPPED', 'OFD', 'DELIVERED'];

  isActive(status: string): boolean {
    const currentIndex = this.statuses.indexOf(this.currentStatus);
    const statusIndex = this.statuses.indexOf(status);
    return statusIndex <= currentIndex;
  }
}
