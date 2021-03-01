import { Injectable } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { ROLE_ADMIN} from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  stateLoginWithRole = '';

  // store the URL so we can redirect after logging in
  redirectUrl: string;  
  constructor(private storage: LocalStorageService, private session: SessionStorageService) { }

  login(): Observable<boolean> {
    const statusLoginLocal = this.storage.retrieve('role');    
    const statusLoginSession = this.storage.retrieve('role');    
    if(statusLoginLocal === ROLE_ADMIN || statusLoginSession === ROLE_ADMIN) { 
      console.log('login with admin');      
      return of(true).pipe(
        tap(val => this.stateLoginWithRole = ROLE_ADMIN)
      );
    }
    console.log('havent user'); 
    return of(true).pipe(
      tap(val => this.stateLoginWithRole = '')
    );    
  }

  logout(): void {
    this.stateLoginWithRole = '';
    this.storage.store('role', '');
    this.session.store('role', '');
  }
}