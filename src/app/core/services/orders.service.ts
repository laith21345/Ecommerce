import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _AuthService = inject(AuthService)

  isAnOrder:WritableSignal<boolean>=signal(false)


  checkOut(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${cartId}?url=${environment.serverURL}`,
      {
        "shippingAddress": shippingAddress
      }
    )
  }

  getUserOrders(): Observable<any> {
    const userId=this._AuthService.userData?.id
    return this._HttpClient.get(`${environment.baseURL}/api/v1/orders/user/${userId}`)
  }








}
