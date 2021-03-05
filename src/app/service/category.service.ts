import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})


export class CategoryService {
  error: HttpErrorResponse;
  nameAPI = 'category';
  private urlAPI = 'http://localhost:3000/' + this.nameAPI + '/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.message}`);
    }
    this.error = error;
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

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
    return this.http.delete(this.urlAPI + '' + id).pipe(
      catchError(this.handleError)
    )
  }
  
}
