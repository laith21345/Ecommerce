import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {


  private readonly _HttpClient=inject(HttpClient)

  AddProductToWishlist(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/wishlist`,
      {
        "productId": productId
      }
    )
  }

  removeProductFromWishlist(productId: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseURL}/api/v1/wishlist/${productId}`,
    )
  }

  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(`${environment.baseURL}/api/v1/wishlist`)
  }




}
