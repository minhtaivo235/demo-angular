import { ProductRoutingModule } from './product-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';


@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ProductRoutingModule    
  ]
})
export class ProductModule { }
