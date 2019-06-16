import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductHomeComponent } from './product-home/product-home.component';

const routes: Routes = [
  { path: '', component: ProductHomeComponent, data: { breadcrumb: 'Product' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
