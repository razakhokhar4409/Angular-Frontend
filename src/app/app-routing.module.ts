import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { ExceptionHandlerComponent } from './exception-handler/exception-handler.component';

const routes: Routes = [
  {path : 'products', component : ProductListComponent},
  {path : 'create-product', component : CreateProductComponent},
  {path : 'exception', component : ExceptionHandlerComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
