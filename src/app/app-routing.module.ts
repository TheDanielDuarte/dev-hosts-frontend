import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/products/page/page.component';
import { ServersResolver } from './resolvers/servers.resolver';
import { DataStorageResolver } from './resolvers/data-storage.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: PageComponent },
      {
        path: 'data-storage',
        component: PageComponent,
        data: { fields: ['storage', 'transfer'] },
        resolve: { data: DataStorageResolver }
      },
      { path: 'services', component: PageComponent },
      {
        path: 'servers',
        component: PageComponent,
        data: { fields: ['memory', 'cpus', 'storage', 'transfer'] },
        resolve: { data: ServersResolver }
      },
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
