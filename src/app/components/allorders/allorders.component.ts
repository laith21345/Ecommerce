import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Iorders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit , OnDestroy {

  private readonly _OrdersService=inject(OrdersService)
  private OrdersServiceSub!:Subscription

  allOrdersList!:Iorders[] | null

  ngOnInit(): void {
    this.OrdersServiceSub=this._OrdersService.getUserOrders().subscribe({
      next:(res)=> {
        this.allOrdersList=res
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err.error);
      },
    })
  }







  ngOnDestroy(): void {
    this.OrdersServiceSub?.unsubscribe()
  }
}
