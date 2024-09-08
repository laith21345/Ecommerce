import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {


  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  private sendVerifyEmailSub!: Subscription
  private sendVerifyCodeSub!: Subscription
  private setNewPasswordSub!: Subscription


  userEmail: string = ''
  msgSuccess: string = ''
  msgError: string = ''
  isLoading: boolean = false
  step: number = 1



  verifyEmailForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
  })

  verifyCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]],
  })

  newPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^([a-zA-Z]{1}[a-zA-Z0-9]{5,9})$/)]],
  })


  submitVerifyEmailForm() {
    if (this.verifyEmailForm.valid && !this.isLoading && this.msgSuccess == '') {
      this.isLoading = true
      this.sendVerifyEmailSub = this._AuthService.sendVerifyEmail(this.verifyEmailForm.value).subscribe({
        next: (res) => {
          if ('success' == res.statusMsg) {
            this.userEmail = this.verifyEmailForm.get('email')?.value
            this.newPasswordForm.get('email')?.patchValue(this.userEmail)
            this.msgSuccess = res.message
            this.isLoading = false
            setTimeout(() => {
              this.msgSuccess = ''
              this.msgError = ''
              this.step = 2
            }, 4000)
          } else {
            this.msgError = res.message
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.msgError = err.error.message
          this.isLoading = false
        }
      })
    }
    else {
      this.verifyEmailForm.markAllAsTouched()
    }
  }


  submitVerifyCodeForm() {


    if (this.verifyCodeForm.valid && !this.isLoading && this.msgSuccess == '') {
      this.isLoading = true
      this.sendVerifyCodeSub = this._AuthService.sendVerifyCode(this.verifyCodeForm.value).subscribe({
        next: (res) => {
          if ('Success' == res.status) {
            console.log(res);
            this.isLoading = false
            this.msgSuccess = ''
            this.msgError = ''
            this.step = 3
          } else {
            this.msgError = res.message
          }
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.msgError = err.error.message
          this.isLoading = false
        }
      })
    }
    else {
      this.verifyCodeForm.markAllAsTouched()
    }
  }

  submitNewPasswordForm() {

    if (this.newPasswordForm.valid && !this.isLoading && this.msgSuccess == '') {
      this.isLoading = true
      this.setNewPasswordSub = this._AuthService.setNewPassword(this.newPasswordForm.value).subscribe({
        next: (res) => {
          this.msgSuccess = res.message
          this.isLoading = false
          localStorage.setItem('userToken', res.token)
          this._AuthService.saveUserData()
          setTimeout(() => {
            this.msgSuccess = ''
            this.msgError = ''
            this._Router.navigate(['/home'])
          }, 4000)
          
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.msgError = err.error.message
          this.isLoading = false
        }
      })
    }
    else {
      this.newPasswordForm.markAllAsTouched()
    }
  }









  ngOnDestroy(): void {
    this.sendVerifyEmailSub?.unsubscribe()
    this.sendVerifyCodeSub?.unsubscribe()
    this.setNewPasswordSub?.unsubscribe()
  }



}
