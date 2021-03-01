import { Component, OnInit } from '@angular/core';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusLogin = false;

  constructor( 
     private storage:LocalStorageService, private session: SessionStorageService) { }

  ngOnInit(){
   
  }
  changeStatusLogin(status) {
    this.statusLogin = status;
  }
}
