import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginToken } from '../interfaces/loginToken';
import { USER_TOKEN } from 'src/app/shared/constants/userToken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userToken$ = new BehaviorSubject<string | null>(null);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) { }

  get user$(): Observable<string | null> {
    return this.userToken$.asObservable();
  }

  public logIn(email: string, password: string): Observable<loginToken> {
    return this.http.post<loginToken>(`${environment.apiUrl}/login`, { email, password });
  }

  public logOut(): void {
    localStorage.setItem(USER_TOKEN, '');
    this.userToken$.next('');
    this.router.navigate(['/login']);
  }

}
