import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  nameAPI = 'product';
  private urlAPI = 'http://localhost:3000/' + this.nameAPI + '/';

  constructor(private http: HttpClient) { }

  getListProduct(): Observable<any>{
    return this.http.get<any>(this.urlAPI);
  }
  getProductById(id): Observable<any> {
    return this.http.get<any>(this.urlAPI + '' + id);
  }
}
