import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  userAsyn: Observable<User>;
  user: User;
  constructor(private store: Store<{ user: User }>) {
  } 
  
  
  
  ngOnInit(): void {  
    this.userAsyn = this.store.select('user');  
    this.userAsyn.subscribe(data => {
      this.user = {...data};
    })       
  }

}
