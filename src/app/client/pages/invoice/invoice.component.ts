import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../apis/services';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/token/token.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderResponse } from '../../../apis/models';
import { NgxPrintModule } from 'ngx-print';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [DatePipe,CurrencyPipe,NgxPrintModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent implements OnInit {
  
  constructor(
    private orderService : OrderService,
    private activatedRoute : ActivatedRoute,
    private tokenServ : TokenService,
    private router : Router
  ){}

  ngOnInit(): void {
    const billNo = this.activatedRoute.snapshot.params['billNo'];
    if (billNo) {
      this.getOrderDetails(billNo);
    }
  }

  order : OrderResponse = {};

  getOrderDetails(billNo:string){
    this.orderService.getSingleOrder({
      billNo : billNo
    }).subscribe({
      next:(res)=>{
        this.order= res;
      },
      error:(err)=>{
        console.log(err);
        alert(err.error.errorMessage);
      }
    })
  }

  getImage(blobImage:string | undefined):string|undefined{
    if(blobImage){
      return "data:image/jpg;base64,"+blobImage;
    }
    return "";
  }

  printInvoice(){

  }

}
