import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { IRegistrationForm } from '../interfaces/iregistration-form';
import { ILoginForm } from '../interfaces/ilogin-form';
import { jwtDecode } from 'jwt-decode';
import { IUserData } from '../interfaces/iuser-data';
import { Router } from '@angular/router';
import { IVerifyEmailForm } from '../interfaces/iverify-email-form';
import { IVerifyCodeForm } from '../interfaces/iverify-code-form';
import { IResetPasswordForm } from '../interfaces/ireset-password-form';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient)
  private readonly _Router = inject(Router)

  userData:IUserData | null=null

  setRegistrationForm(data: IRegistrationForm): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signup`,data)
  }
  setLoginForm(data:ILoginForm ): Observable<any> {
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/signin`,data)
  }

  saveUserData():void{
    let userToken:string | null =localStorage.getItem('userToken')
    if (userToken !== null) {
      this.userData=jwtDecode(userToken)
    }
  }

  logout():void{
    localStorage.removeItem('userToken')
    this.userData=null
    this._Router.navigate(['/login'])
    
  }


  sendVerifyEmail(data:IVerifyEmailForm):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`,data)
  }
  sendVerifyCode(data:IVerifyCodeForm):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`,data)
  }
  setNewPassword(data:IResetPasswordForm):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/api/v1/auth/resetPassword`,data)
  }

}
