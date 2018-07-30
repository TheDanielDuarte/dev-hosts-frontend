import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductComponent } from '../product/product.component';
import { ApiConsumerService } from '@services/api-consumer.service';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;
  public data: any[];
  public userIsLoggedIn: boolean;
  @ViewChildren(ProductComponent) private products: QueryList<ProductComponent>;
  public fields: string[];

  constructor(
    private api: ApiConsumerService,
    private productsComunication: ProductsCommunicationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showAsGrid$ = this.productsComunication
    .onNewLayout()
    .pipe( map(layout => layout === 'grid') );

    this.filter$ = this.productsComunication.onFilterProducts();
    this.userIsLoggedIn = true;
    this.route.data.subscribe(data => {
      console.log(data);
      this.fields = data.fields;
      this.data = data.data;
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

}
