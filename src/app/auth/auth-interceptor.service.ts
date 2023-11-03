import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authSrvc: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authSrvc.user.pipe(take(1), exhaustMap(user =>{
      if (user){
        const request = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(request)
      }

      return next.handle(req)
    }));
  }
}
