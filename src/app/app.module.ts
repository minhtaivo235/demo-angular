import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { NavbarAdminComponent } from './layouts/navbar-admin/navbar-admin.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer, userReducer } from './store/user/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarAdminComponent
  ],
  imports: [
    BrowserModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    AdminModule,
    StoreModule.forRoot({ user: userReducer}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
