import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { SaveProductComponent } from './save-product/save-product.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'add', component: SaveProductComponent },
  { path: 'edit/:id', component: SaveProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
