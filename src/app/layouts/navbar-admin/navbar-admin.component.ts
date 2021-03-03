import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';
import {resetUser} from '../../store/user/user.actions';
import { selectFeatureUser } from '../../store/user/user.selector';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userAsyn: Observable<User>;
  user: any;
  constructor(private store: Store<{ user: User }>, private router: Router, private route: ActivatedRoute, private storage:LocalStorageService) {
  } 
  
  
  
  ngOnInit(): void {  
    // this.userAsyn = this.store.select('user');  
    // this.userAsyn.subscribe(data => {
    //   this.user = {...data};
    // })   
    
    this.user = {...this.storage.retrieve('profile')};
    console.log(this.user);
    
          
  }
  loadData() {
    this.store.select(selectFeatureUser).subscribe(data => this.user = {...data})
  }

  logout() {
    this.store.dispatch(resetUser());    
    this.storage.clear();
    this.router.navigate(['/']);
  }

}
