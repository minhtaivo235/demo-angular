import { CategoryService } from './service/category.service';
import { HttpConfigInterceptor } from './auth/httpconfig.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
import { NavbarAdminComponent } from './layouts/navbar-admin/navbar-admin.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer, userReducer } from './store/user/user.reducer';
import { HomeComponent } from './layouts/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { CategoryModalComponent } from './layouts/modal/category-modal/category-modal.component';
import { ConfirmDeleteModalComponent } from './layouts/modal/confirm-delete-modal/confirm-delete-modal.component';




const store = {
  user: userReducer
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarAdminComponent,
    HomeComponent,
    AdminComponent,
    CategoryModalComponent,
    ConfirmDeleteModalComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule,
    
    AppRoutingModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    AdminModule,
    StoreModule.forRoot(store),
  ],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ CategoryModalComponent, ConfirmDeleteModalComponent ]

})
export class AppModule { }
