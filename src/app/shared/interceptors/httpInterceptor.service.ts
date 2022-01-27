import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USER_TOKEN } from '../constants/userToken';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private reqClone!: HttpRequest<any>;

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem(USER_TOKEN);

    if (authToken) {
      const headers = new HttpHeaders({ USER_TOKEN: authToken });
      this.reqClone = req.clone({ headers });
    } else this.reqClone = req.clone();

    return next.handle(this.reqClone);
  }

}
