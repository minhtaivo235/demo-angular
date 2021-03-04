import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminComponent } from '../layouts/admin/admin.component';

const routes: Routes = [
  {
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)},
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
    ],
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
