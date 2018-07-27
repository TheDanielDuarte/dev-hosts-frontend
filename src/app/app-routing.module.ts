import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DataStorageComponent } from './components/products/data-storage/data-storage.component';
import { ServicesComponent } from './components/products/services/services.component';
import { ServersComponent } from './components/products/servers/servers.component';
import { AllProductsComponent } from './components/products/all-products/all-products.component';
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
  { path: 'error', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
