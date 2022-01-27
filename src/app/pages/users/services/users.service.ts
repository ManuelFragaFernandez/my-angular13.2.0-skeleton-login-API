import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { usersList } from '../interfaces/usersList';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  public getUsersList(page: number): Observable<usersList> {
    const params = { page };
    return this.http.get<usersList>(`${environment.apiUrl}/users`, { params });
  }

}
