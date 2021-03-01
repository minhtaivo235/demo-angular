import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  nameAPI = 'users';
  private urlAPI = 'http://localhost:3000/' + this.nameAPI + '/';

  constructor(private http: HttpClient) { }

  getListUser(): Observable<User>{
    return this.http.get<User>(this.urlAPI);
  }
  login(user): Observable<any>{
    return this.http.post<any>(this.urlAPI + 'login', user);
  }
}
