import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit , OnDestroy {

  private readonly _ProductsService=inject(ProductsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _CartService=inject(CartService)
  
  private readonly _ToastrService=inject(ToastrService)
  
  private getSpecificProductSub!:Subscription
  private paramMapSub!:Subscription
  private AddProductToCartSub!:Subscription

  

  private id!:string
  productInfo!:IProduct
  
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayMouseleaveTimeout:4000,
    autoplayHoverPause:true,
    dots: false,
    navSpeed: 700,
    navText: ['previous', 'next'],
    items: 1,
    nav: true
  }




  ngOnInit(): void {
    //get id
    this.paramMapSub=this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.id=p.get('id')!
      }
    })
    // get productInfo
    this.getSpecificProductSub=this._ProductsService.getSpecificProduct(this.id).subscribe({
      next:(res)=>{
        this.productInfo=res.data
        console.log(this.productInfo);
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err.error);
      }
    })
  }


  addToCart(productId:string):void{
    this.AddProductToCartSub=this._CartService.AddProductToCart(productId).subscribe({
      next:(res)=> {
        if ('success'==res.status) {
          console.log(res);
          this._ToastrService.success(`${res.message}. 🛺`,'Add To Cart')
        }
      },
      error:(err:HttpErrorResponse)=> {
          console.log(err.error);
      }
    })
  }







  ngOnDestroy(): void {
    this.paramMapSub?.unsubscribe()
    this.getSpecificProductSub?.unsubscribe()
    this.AddProductToCartSub?.unsubscribe()
  }


}
