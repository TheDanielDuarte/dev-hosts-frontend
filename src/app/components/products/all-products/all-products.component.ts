import { Component, OnInit } from '@angular/core';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;

  constructor(
    private productsComunication: ProductsCommunicationService
  ) { }

  ngOnInit() {
    this.showAsGrid$ = this.productsComunication
      .onNewLayout()
      .pipe( map(layout => layout === 'grid') );

    this.filter$ = this.productsComunication.onFilterProducts();
  }
}
