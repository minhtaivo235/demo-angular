import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {
  nameAPI = 'category';
  private urlAPI = 'http://localhost:3000/' + this.nameAPI + '/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getListCategory(): Observable<any>{
    return this.http.get<Category>(this.urlAPI);
  }
  getOneCategory(id): Observable<any>{
    return this.http.get<Category>(this.urlAPI + '' + id);
  }
  updateCategory(id, data): Observable<any>{
    return this.http.put(`${this.urlAPI}${id}`, data, this.httpOptions)
  }
  createCategory(data): Observable<any> {
    return this.http.post(this.urlAPI, data, {observe: 'body'});
  }
  deleteCategory(id): Observable<any> {
    return this.http.delete(this.urlAPI + '' + id)
  }
  
}
