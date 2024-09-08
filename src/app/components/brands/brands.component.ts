import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBrands } from '../../core/interfaces/ibrands';
import { BrandsService } from '../../core/services/brands.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [ ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements  OnInit,OnDestroy{

  private readonly _BrandsService=inject(BrandsService)

  getAllBrandsSub!:Subscription
  getSpecifiBrandSub!:Subscription

  brandsList:WritableSignal<IBrands[]>=signal([])

  ngOnInit(): void {
    // get all Categories
    this.getAllBrandsSub=this._BrandsService.getAllPrands().subscribe({
      next:(res)=> {
        console.log(res);
        this.brandsList.set(res.data)
      },
    })
  }


  getBrandInfo(categoryId:string):void{
    this.getSpecifiBrandSub=this._BrandsService.getSpecifiPrand(categoryId).subscribe({
      next:(res)=> {
        console.log(res);
        Swal.fire({
          title: `${res.data.name}`,
          text: "",
          imageUrl: `${res.data.image}`,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: `${res.data.name}`
        });
      },
    })
  }



  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe()
    this.getAllBrandsSub?.unsubscribe()
  }

}
