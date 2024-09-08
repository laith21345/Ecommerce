import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ProjectCode';

  private readonly _AuthService=inject(AuthService)
  private readonly _PLATFORM_ID=inject(PLATFORM_ID)

  ngOnInit(): void {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      this._AuthService.saveUserData()
    }
  }


}
