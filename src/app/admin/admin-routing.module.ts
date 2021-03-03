import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { AdminComponent } from '../layouts/admin/admin.component';

const routes: Routes = [
  {
    path: 'admin', 
    component: AdminComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: 'category', component: CategoryComponent,canActivate: [AuthGuard] },
      { path: 'product', component: ProductComponent,canActivate: [AuthGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
