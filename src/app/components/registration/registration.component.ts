import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { IAuthRequest } from '../../core/interfaces/isignup-request';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent implements OnDestroy{

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  

  private setRegistrationFormSub!:Subscription

  isLoading:boolean=false
  msgSuccess:boolean=false


  registerForm:FormGroup = this._FormBuilder.group({

  name:[null,[ Validators.required , Validators.minLength(3) , Validators.maxLength(20) ]],
  email:[null,[ Validators.required , Validators.email ]],
  phone:[null,[ Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/) ]],
  password:[null,[ Validators.required , Validators.pattern(/^([a-zA-Z]{1}[a-zA-Z0-9]{5,9})$/) ]],
  rePassword:[null,[ Validators.required ]]

  } , { validators: this.confirmPassword  })

  confirmPassword(g:AbstractControl) {
    if ( g.get('password')?.value == g.get('rePassword')?.value && g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }

  submitRegistrationForm() {
    if (this.registerForm.valid && !this.isLoading) {
      this.isLoading=true
      this.setRegistrationFormSub=this._AuthService.setRegistrationForm(this.registerForm.value).subscribe({
        next:(res:IAuthRequest)=>{
          if('success'==res.message){
            this.msgSuccess=true
            this.isLoading=false
            setTimeout(()=>{
              this._Router.navigate(['/login'])
            },1000)
          }
        },
        error:(err)=> {
          this.isLoading = false
        },
      })
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }





  ngOnDestroy(): void {
    this.setRegistrationFormSub?.unsubscribe()
  }


}


