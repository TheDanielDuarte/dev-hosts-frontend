import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { ProductsCommunicationService } from '@services/products-communication.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Server } from '@models/server';
import { ApiConsumerService } from '@services/api-consumer.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {
  public showAsGrid$: Observable<boolean>;
  public filter$: Observable<{ active: boolean; value: string }>;
  public servers$: Observable<&Server[]>;
  public readonly fields = ['memory', 'cpus', 'storage', 'transfer'];
  public userIsLoggedIn: boolean;
  @ViewChildren(ProductComponent) private products: QueryList<ProductComponent>;

  constructor(
    private productsComunication: ProductsCommunicationService,
    private api: ApiConsumerService
  ) { }

  public ngOnInit() {
    this.showAsGrid$ = this.productsComunication
      .onNewLayout()
      .pipe( map(layout => layout === 'grid') );
    this.filter$ = this.productsComunication.onFilterProducts();
    this.servers$ = this.api.servers().pipe(
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
        (server as any).cpus = server.cpu;
        delete server.cpu;
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
