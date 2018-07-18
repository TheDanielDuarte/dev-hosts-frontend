import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DataStorageComponent } from './components/Products/data-storage/data-storage.component';
import { ServicesComponent } from './components/Products/services/services.component';
import { ServersComponent } from './components/Products/servers/servers.component';
import { AllProductsComponent } from './components/Products/all-products/all-products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllProductsComponent },
      { path: 'data-storage', component: DataStorageComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'servers', component: ServersComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
