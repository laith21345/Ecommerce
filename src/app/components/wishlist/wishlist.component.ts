import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWishlist } from '../../core/interfaces/iwishlist';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, TrimTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {

  private readonly _WishlistService = inject(WishlistService)
  private readonly _CartService = inject(CartService)

  private readonly _ToastrService = inject(ToastrService)




  private getLoggedUserWishlist!: Subscription
  private removeProductFromWishlistSub!: Subscription
  private AddProductToCartSub!: Subscription


  wishlistInfo:WritableSignal<IWishlist> = signal({
    status: '',
    count: 0,
    data: []
  })

  ngOnInit(): void {
    this.getLoggedUserWishlist = this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if ('success' == res.status) {
          this.wishlistInfo.set(res) 
          console.log(res);
        }
      },

    })
  }




  removeItem(productId: string): void {
    this.removeProductFromWishlistSub = this._WishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        if ('success' == res.status) {
          // تصفية العناصر بناءً على id
          this.wishlistInfo().data = this.wishlistInfo().data?.filter((item) => item._id !== productId);

          // تحديث العدد بعد الحذف
          this.wishlistInfo().count =this.wishlistInfo().data?.length ;
          console.log(res);
          this._ToastrService.success('Remove Item was Done ☹️', 'Wishlist')
        }
      },

    })
  }


  addToCart(productId: string): void {
    this.AddProductToCartSub = this._CartService.AddProductToCart(productId).subscribe({
      next: (res) => {
        if ('success' == res.status) {
          console.log(res);
          this._CartService.cartCount.set(res.numOfCartItems)
          this._ToastrService.success(`${res.message}. 🛺`, 'Add To Cart')
        }
      },
    })
  }

  ngOnDestroy(): void {
    this.getLoggedUserWishlist?.unsubscribe()
    this.removeProductFromWishlistSub?.unsubscribe()
    this.AddProductToCartSub?.unsubscribe()
  }


}