import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../../apis/services';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss'
})
export class PaymentSuccessComponent implements OnInit{
  
  constructor(
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private orderService : OrderService
  ){}
  ngOnInit(): void {
    const queryParams = this.activatedRoute.snapshot.queryParams;
    console.log(queryParams)
    if ("paymentId" in queryParams && "PayerID" in queryParams) {
      this.paymentId =  queryParams['paymentId'] as string;
      this.payeeId =  queryParams['PayerID'] as string;
      this.checkIfPaymentPassed();
    }else{
      this.router.navigateByUrl('404');
    }
  }

  paymentId = "";
  payeeId = "";

  checkIfPaymentPassed(){
    this.orderService.paymentSuccess({
      PayerId : this.payeeId,
      paymentId : this.paymentId
    }).subscribe({
      next:(res)=>{
        if (res != "approved") {
          this.router.navigateByUrl('failed');
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  completeOrder(){
    this.router.navigate(['checkout',this.paymentId]);
  }

}
