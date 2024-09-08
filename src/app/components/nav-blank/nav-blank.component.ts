import { Component, computed, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { OrdersService } from '../../core/services/orders.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ,NgClass],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit , OnDestroy{

  readonly _AuthService = inject(AuthService)
  readonly _CartService = inject(CartService)
  readonly _OrdersService = inject(OrdersService)

  getLoggedUserCartSub!:Subscription
  OrdersServiceSub!:Subscription

  isAnOrderNav:Signal<boolean>=computed(()=>this._OrdersService.isAnOrder())

  navCartCount:Signal<number>= computed(()=>this._CartService.cartCount())


  ngOnInit(): void {
    this.OrdersServiceSub=this._OrdersService.getUserOrders().subscribe({
      next:(res)=> {
        this._OrdersService.isAnOrder.set(res.count==0?false:true) 
      },
    })
    this.getLoggedUserCartSub=this._CartService.getLoggedUserCart().subscribe({
      next:(res)=> {
        this._CartService.cartCount.set(res.numOfCartItems)
      },
    })
  }







  ngOnDestroy(): void {
    this.getLoggedUserCartSub?.unsubscribe()
    this.OrdersServiceSub?.unsubscribe()
  }
}
