import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PageComponent } from './components/products/page/page.component';
import { ServersResolver } from './resolvers/servers.resolver';
import { DataStorageResolver } from './resolvers/data-storage.resolver';
import { ServiceResolver } from './resolvers/service.resolver';
import { ProductsOverviewComponent } from './components/products/products-overview/products-overview.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview',
        component: ProductsOverviewComponent,
      },
      {
        path: 'data-storage',
        component: PageComponent,
        data: { fields: ['storage', 'transfer'] },
        resolve: { data: DataStorageResolver }
      },
      {
        path: 'services',
        component: PageComponent,
        data: { groups: [
          { title: 'Load Balancer' },
          { title: 'Continuous integration', fields: ['builds', 'concurrentBuilds'] },
          { title: 'Error Logging / Monitoring', fields: ['events', 'history', 'users'] }
        ] },
        resolve: { data: ServiceResolver }
      },
      {
        path: 'servers',
        component: PageComponent,
        data: { fields: ['memory', 'cpus', 'storage', 'transfer'] },
        resolve: { data: ServersResolver }
      },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
