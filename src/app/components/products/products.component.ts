import { Component, inject, NgModule, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SearchForProductByTitlePipe } from '../../core/pipes/search-for-product-by-title.pipe';
import { FormsModule } from '@angular/forms';
import { TrimTextPipe } from '../../core/pipes/trim-text.pipe';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductCardComponent } from '../product-card/product-card.component';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ RouterLink , FormsModule , SearchForProductByTitlePipe ,
    ProductCardComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit , OnDestroy{

  private readonly _ProductsService=inject(ProductsService)
  private readonly _CartService=inject(CartService)
  private readonly _WishlistService=inject(WishlistService)
  
  private readonly _ToastrService=inject(ToastrService)
  
  private getAllProductsSub!:Subscription
  private AddProductToCartSub!:Subscription
  private getLoggedUserWishlistSub!:Subscription

  productsList!:IProduct[]
  wishlist:string[]=[]

  text:string=''
  

  ngOnInit(): void {
    //get all products
    this.getAllProductsSub=this._ProductsService.getAllProducts().subscribe({
      next:(res)=> {
        this.productsList=res.data
        console.log(this.productsList);
      },
      error:(err:HttpErrorResponse)=> {
        console.log(err.error);
      },
    })

    
    // Get logged user wishlist
    this.getLoggedUserWishlistSub=this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=> {
        if ('success'==res.status) {
          this.wishlist=res.data.map((item:any)=>item._id)
        }
      }
    })

  }


  addToCart(productId:string):void{
    this.AddProductToCartSub=this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=> {
        if ('success'==res.status) {
          console.log(res);
          this._CartService.cartCount.set(res.numOfCartItems)
          this._ToastrService.success(`${res.message}. 🛺`,'Add To Cart')
        }
      }
    })
  }



  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe()
    this.AddProductToCartSub?.unsubscribe()
    this.getLoggedUserWishlistSub?.unsubscribe()
  }

}
