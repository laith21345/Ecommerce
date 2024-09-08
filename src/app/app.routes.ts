import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';

export const routes: Routes = [

    { path:'' , component:AuthLayoutComponent ,canActivate:[logedGuard],
        children:[
            {path:'',redirectTo:'registration',pathMatch:'full'},
            {path:'registration',title:'registration',loadComponent:()=>import('./components/registration/registration.component').then((c)=>c.RegistrationComponent)},
            {path:'login',title:'login',loadComponent:()=>import('./components/login/login.component').then((c)=>c.LoginComponent)},
            {path:'forget-passowrd',title:'forget password',loadComponent:()=>import('./components/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent)},
        ]
    },
    { path:'' , component:BlankLayoutComponent,canActivate:[authGuard],
        children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path:'home',title:'home',loadComponent:()=>import('./components/home/home.component').then((c)=>c.HomeComponent)},
            {path:'cart',title:'cart',loadComponent:()=>import('./components/cart/cart.component').then((c)=>c.CartComponent)},
            {path:'wishlist',title:'wishlist',loadComponent:()=>import('./components/wishlist/wishlist.component').then((c)=>c.WishlistComponent)},
            {path:'products',title:'products',loadComponent:()=>import('./components/products/products.component').then((c)=>c.ProductsComponent)},
            {path:'categories',title:'categories',loadComponent:()=>import('./components/categories/categories.component').then((c)=>c.CategoriesComponent)},
            {path:'brands',title:'brands',loadComponent:()=>import('./components/brands/brands.component').then((c)=>c.BrandsComponent)},
            {path:'details/:id',title:'details',loadComponent:()=>import('./components/details/details.component').then((c)=>c.DetailsComponent)},
            {path:'orders/:cartId',title:'orders',loadComponent:()=>import('./components/orders/orders.component').then((c)=>c.OrdersComponent)},
            {path:'allorders',title:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((c)=>c.AllordersComponent)},
        ]
    },
    { path:'**' ,title:'not found', loadComponent:()=>import('./components/notfound/notfound.component').then((c)=>c.NotfoundComponent)},
    



];
