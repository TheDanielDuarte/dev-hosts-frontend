import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, Subscription, iif } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductComponent } from '../product/product.component';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;
  public data: any[];
  public userIsLoggedIn$: Observable<boolean>;
  @ViewChildren(ProductComponent) private products: QueryList<ProductComponent>;
  public fields: string[];
  public groups: { title: string, data: any[], fields: string[] }[];
  private subscriptions: Subscription[] = [];

  constructor(
    private productsComunication: ProductsCommunicationService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.showAsGrid$ = this.productsComunication
    .onNewLayout()
    .pipe( map(layout => layout === 'grid') );

    this.filter$ = this.productsComunication.onFilterProducts();
    this.userIsLoggedIn$ = this.auth.isAuthenticated();
    this.productsComunication.onFilterProducts().subscribe(val => this.onFilter(val));
    const subscription = this.route.data.subscribe(data => {
      if (!data.groups) {
        this.fields = data.fields;
        this.data = data.data;
      } else {
        this.groups = data.groups.map((group, index) => ({ fields: [], ...group, data: data.data[index] }));
      }
    });
    this.subscriptions.push(subscription);
  }

  private onFilter(val: { active: boolean; value: string }) {
    const productsArray = this.products.toArray();
    if (val.active) {
      for (const product of productsArray) {
        const action = product.titleMatches(val.value) ? 'show' : 'hide';
        product[action]();
      }
    } else {
      for (const product of productsArray) {
        product.show();
      }
    }
  }

  public onActivate(id: string) {
    this.products.forEach(product => {
      if (product.productId !== id) {
        if (product.isActive) {
          product.toggleActive();
        }
        product.toggleShadowMode();
      }
    });
  }

  public onDeactivate(id: string) {
    this.products.forEach(product => {
      if (product.productId !== id && product.isShadowed) {
        product.toggleShadowMode();
      }
    });
  }

  public onProductPurchased(productId: number) {
    const [ url ] = this.route.snapshot.url;
    const path = url.path.includes('-') ? url.path.split('-')[1].trim() : url.path;

    const subscription = this.auth.subscribeToProduct(productId, path as any).subscribe(console.log);
    this.subscriptions.push(subscription);
  }

  public onProductAddedToCart(productId: number) {
    console.log('addedToCart: ' + productId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
