import { Injectable } from '@angular/core';
import * as camelcaseKeys from 'camelcase-keys';
import { Observable, merge } from 'rxjs';
import { Service } from '@models/service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { DataStorage } from '@models/data-storage';
import { Server } from '@models/server';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {
  private static readonly apiURL = 'https://devhosts.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public servers() {
    return this.getResource<Server>('servers');
  }

  public services(): Observable<{groupId: number, data: Service[]}[]> {
    return this.getResource<Service>('services').pipe(
      map(services => services.reduce((acc, val) => {
        const index = acc.findIndex(value => value.groupId === val.group.id);

        if (index < 0) {
          acc.push({ groupId: val.group.id, data: [val] });
        } else {
          acc[index].data.push(val);
        }

        return acc;
      }, [] as { groupId: number, data: Service[] }[])),
    );
  }

  public dataStorage(): Observable<DataStorage[]> {
    return this.getResource<DataStorage>('storage-centers');
  }

  public all(): Observable<any[]> {
    return merge( this.dataStorage(), this.servers(), this.services() );
  }

  private getResource<T>(resource: string): Observable<T[]> {
    return this.http.get<Server>(`${ApiConsumerService.apiURL}/${resource}`).pipe(
      map((res: any) => res.data),
      map(data => (data.map(camelcaseKeys) as T[]))
    );
  }

  private transformKeyToText(field: string) {
    if (field.includes('In')) {
      const regex = /(\w+)in(\w+)$/gi;
      const [, prop, unit] = regex.exec(field);

      if (unit === 'Days') {
        return [prop, ` ${unit}`];
      }
      return [prop, unit];
    } else if (field.includes('Per') && field !== 'pricePerMonth') {
      const regex = /(\w+)per(\w+)$/gi;
      const [, prop, unit] = regex.exec(field);

      return [prop, `/${unit}`];
    }
    return field;
  }

  public propertiesToWords(products: any[]) {
    return products.map(product => {
      Object.entries(product)
        .forEach(([oldKey, value]) => {
          const result = this.transformKeyToText(oldKey);
          if (Array.isArray(result)) {
            const [newKey, unit] = result;
            product[newKey] = value + (isNaN(parseInt((value as string), 16)) ? '' : unit);
            delete product[oldKey];
          }
        });
      return product;
    });
  }
}
