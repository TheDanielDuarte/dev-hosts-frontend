import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiConsumerService } from '@services/api-consumer.service';
import { DataStorage } from '@models/data-storage';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-data-storage',
  templateUrl: './data-storage.component.html',
  styleUrls: ['./data-storage.component.scss']
})
export class DataStorageComponent implements OnInit {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;
  public storageCenters$: Observable<&DataStorage[]>;
  public userIsLoggedIn: boolean;
  @ViewChildren(ProductComponent) private products: QueryList<ProductComponent>;
  public readonly fields = ['storage', 'transfer'];

  constructor(
    private productsComunication: ProductsCommunicationService,
    private api: ApiConsumerService
  ) { }

  ngOnInit() {
    this.showAsGrid$ = this.productsComunication
      .onNewLayout()
      .pipe( map(layout => layout === 'grid') );

    this.filter$ = this.productsComunication.onFilterProducts();
    this.storageCenters$ = this.api.dataStorage().pipe(
      map(servers => servers.map(server => {
        Object.entries(server)
          .forEach(([oldKey, value]) => {
            const result = this.api.transformKeyToText(oldKey);
            if (Array.isArray(result)) {
              const [newKey, unit] = result;
              server[newKey] = value + unit;
              delete server[oldKey];
            }
          });
        // (server as any).cpus = server.cpu;
        // delete server.cpu;
        return server;
      }))
    );
    this.userIsLoggedIn = true;
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
