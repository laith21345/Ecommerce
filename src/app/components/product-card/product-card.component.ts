import { Component, inject, input, InputSignal, OnDestroy, signal, Signal, WritableSignal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [ RouterLink , TrimTextPipe ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements  OnDestroy{

  private readonly _CartService=inject(CartService)
  private readonly _WishlistService=inject(WishlistService)

  private AddProductToCartSub!:Subscription
  private AddProductToWishlistSub!:Subscription
  private removeProductFromWishlistSub!:Subscription

  private readonly _ToastrService=inject(ToastrService)

  product:InputSignal<IProduct>=input.required()


  isInWishInp:InputSignal<boolean>=input.required()
  isInWish:WritableSignal<boolean>=signal(false)



  addToCart():void{
    this.AddProductToCartSub=this._CartService.AddProductToCart(this.product().id).subscribe({
      next:(res)=> {
        if ('success'==res.status) {
          console.log(res);
          this._CartService.cartCount.set(res.numOfCartItems)
          this._ToastrService.success(`${res.message}. 🛺`,'Add To Cart')
        }
      },
    })
  }

  addToWishlist():void{
      this.AddProductToWishlistSub=this._WishlistService.AddProductToWishlist(this.product()._id).subscribe({
        next:(res)=> {
          if ('success'==res.status) {
            console.log(res);
            this.isInWish.set(true)
            this._ToastrService.success(`${res.message}. ❤️+`,'Add To Wishlist')
          }
        },
      })
  }

  removeFromWishlist():void{
      this.removeProductFromWishlistSub=this._WishlistService.removeProductFromWishlist(this.product().id).subscribe({
        next:(res)=> {
          if ('success'==res.status) {
            console.log(res);
            this.isInWish.set(false)
            this._ToastrService.success(`${res.message}. ❤️-`,'Remove From Wishlist')
          }
        },
      })
  }












  ngOnDestroy(): void {
    this.AddProductToCartSub?.unsubscribe()
    this.AddProductToWishlistSub?.unsubscribe()
    this.removeProductFromWishlistSub?.unsubscribe()
  }
}
