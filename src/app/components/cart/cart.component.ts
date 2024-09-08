import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { CartService } from '../../core/services/cart.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ RouterLink , CurrencyPipe , TrimTextPipe ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {

  private readonly _CartService = inject(CartService)
  
  private readonly _ToastrService = inject(ToastrService)


  private removeSpecificCartItemSub!: Subscription
  private incCartProductQuantitySub!: Subscription
  private decCartProductQuantitySub!: Subscription
  private clearUserCartSub!: Subscription


  cartInfo: ICart={
    status:'',
    cartId:'',
    numOfCartItems:0,
    data:null
  }
  cartProductsList=this.cartInfo?.data?.products

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if ('success' == res.status) {
          this.cartInfo = res
          console.log(res);
        }
      },
      
    })
  }


  removeItem(itemId: string): void {
    this.removeSpecificCartItemSub = this._CartService.removeSpecificCartItem(itemId).subscribe({
      next: (res) => {
        if ('success' == res.status) {
          this.cartInfo = res
          console.log(res);
          
          this._CartService.cartCount.set(res.numOfCartItems)
          this._ToastrService.success('Remove Item was Done ☹️','Fresh Cart')
        }
      },
      
    })
  }

  incCount(itemId: string, count: number): void {
    let newCount = count + 1
    this.incCartProductQuantitySub = this._CartService.updateCartProductQuantity(itemId, newCount).subscribe({
      next: (res) => {
        if ('success' == res.status) {
          this.cartInfo = res
        }
      },
      
    })
  }

  decCount(itemId: string, count: number): void {
    let newCount = count - 1
    if (newCount!=0) {
      this.decCartProductQuantitySub = this._CartService.updateCartProductQuantity(itemId, newCount).subscribe({
        next: (res) => {
          if ('success' == res.status) {
            this.cartInfo = res
          }
        },
        
      })
    }
  }

  clearCart(): void {
    this.clearUserCartSub = this._CartService.clearUserCart().subscribe({
      next: (res) => {
        if ('success' == res.message) {
          this.cartInfo.numOfCartItems = 0
          this.cartInfo.data = null
          this._CartService.cartCount.set(0)
          this._ToastrService.success('clear All Items was Done ☹️','Fresh Cart')
        }
      },
      
    })
  }












  ngOnDestroy(): void {
    this.removeSpecificCartItemSub?.unsubscribe()
    this.incCartProductQuantitySub?.unsubscribe()
    this.decCartProductQuantitySub?.unsubscribe()
    this.clearUserCartSub?.unsubscribe()
  }

}
