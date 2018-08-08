import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HomeFeatureComponent } from './components/home/home-feature/home-feature.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './components/products/product/product.component';
import { FieldToWordPipe } from './pipes/field-to-word.pipe';
import { PageComponent } from './components/products/page/page.component';
import { ProductsOverviewComponent } from './components/products/products-overview/products-overview.component';
import { AuthWidgetComponent } from './components/auth-widget/auth-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    PageNotFoundComponent,
    HomeFeatureComponent,
    ProductComponent,
    FieldToWordPipe,
    PageComponent,
    ProductsOverviewComponent,
    AuthWidgetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
