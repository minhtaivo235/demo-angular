import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth/auth.guard';
import { ProductComponent } from './product.component';

const routes: Routes = [
    {
        path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard]
    },
    {
      path: '', component: ProductComponent, canActivate: [AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
