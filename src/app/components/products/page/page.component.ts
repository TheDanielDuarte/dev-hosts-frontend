import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductComponent } from '../product/product.component';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;
  public data: any[];
  public userIsLoggedIn: boolean;
  @ViewChildren(ProductComponent) private products: QueryList<ProductComponent>;
  public fields: string[];
  public groups: { title: string, data: any[], fields: string[] }[];
  private subscription: Subscription;

  constructor(
    private productsComunication: ProductsCommunicationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showAsGrid$ = this.productsComunication
    .onNewLayout()
    .pipe( map(layout => layout === 'grid') );

    this.filter$ = this.productsComunication.onFilterProducts();
    this.userIsLoggedIn = true;
    this.subscription = this.route.data.subscribe(data => {
      if (!data.groups) {
        this.fields = data.fields;
        this.data = data.data;
      } else {
        this.groups = data.groups.map((group, index) => ({ fields: [], ...group, data: data.data[index] }));
      }
    });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
