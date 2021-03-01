import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {ROLE_ADMIN} from '../constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // this.authService.redirectUrl = state.url;  
          
    return this.checkLogin(state.url);
  }

  checkLogin(url: string): true|UrlTree {
    this.authService.login().subscribe();
    if(this.authService.stateLoginWithRole === ROLE_ADMIN){             
      return true;     
    }
    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;    
    // Redirect to the login page
    
    return this.router.parseUrl('/');
  }
  
}
