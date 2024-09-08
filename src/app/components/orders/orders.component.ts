import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule , NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit, OnDestroy {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _OrdersService = inject(OrdersService)
  
  private ActivatedRouteSub!: Subscription
  private OrdersServiceSub!: Subscription


  isLoading: boolean = false
  msgSuccess: boolean = false

  cartIdToPaid!:string

  shippingAddressForm: FormGroup = this._FormBuilder.group({
    details: [null, [Validators.required]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, [Validators.required]]
  })


  ngOnInit(): void {
    // get cart id
    this.ActivatedRouteSub=this._ActivatedRoute.paramMap.subscribe({
      next:(params)=> {
        this.cartIdToPaid=params.get('cartId')!
      },
    })
  }









  submitShippingAddressForm() {
    if (this.shippingAddressForm.valid && !this.isLoading) {
      this.isLoading = true
      
      this.OrdersServiceSub = this._OrdersService.checkOut(this.cartIdToPaid,this.shippingAddressForm.value).subscribe({
        next: (res) => {
          if ('success' == res.status) {
            this.msgSuccess = true
            this.isLoading = false
            window.open(res.session.url , '_self')
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.isLoading = false
        }
      })
    }
    else {
      this.shippingAddressForm.markAllAsTouched()
    }
  }



  ngOnDestroy(): void {
    this.ActivatedRouteSub?.unsubscribe()
    this.OrdersServiceSub?.unsubscribe()
  }

}
