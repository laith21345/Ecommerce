import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products`)
  }

  getSpecificProduct(id:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/api/v1/products/${id}`)
  }






}
