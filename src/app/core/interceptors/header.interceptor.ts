import { HttpInterceptorFn } from '@angular/common/http';


export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (!(req.url.includes('products')||req.url.includes('categories')||req.url.includes('auth'))) {
    req=req.clone({
      setHeaders:{token:localStorage.getItem('userToken')!}
    })
  }

  return next(req);
};
