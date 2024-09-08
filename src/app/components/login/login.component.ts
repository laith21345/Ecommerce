import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { IAuthRequest } from '../../core/interfaces/isignup-request';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass ,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {




  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  private setLoginFormSub!: Subscription

  isLoading: boolean = false
  msgSuccess: boolean = false


  loginForm: FormGroup = this._FormBuilder.group({

    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^([a-zA-Z]{1}[a-zA-Z0-9]{5,9})$/)]],
  })



  submitLoginForm() {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true
      this.setLoginFormSub = this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res: IAuthRequest) => {
          if ('success' == res.message) {
            this.msgSuccess = true
            this.isLoading = false

            localStorage.setItem('userToken', res.token)
            this._AuthService.saveUserData()

            setTimeout(() => {
              this._Router.navigate(['/home'])
            }, 1000)
          }
        },
        error:(err)=> {
          this.isLoading = false
        },
      })
      
    }
    else {
      this.loginForm.markAllAsTouched()
    }
  }









  ngOnDestroy(): void {
    this.setLoginFormSub?.unsubscribe()
  }


}
