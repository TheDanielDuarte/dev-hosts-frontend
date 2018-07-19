import { Injectable } from '@angular/core';
import * as camelcaseKeys from 'camelcase-keys';
import { Observable, merge } from 'rxjs';
import { Server } from '@models/server';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DataStorage } from '@models/data-storage';
import { Service } from '@models/service';

@Injectable({
  providedIn: 'root'
})
export class ApiConsumerService {
  private static readonly apiURL = 'https://devhosts.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  public servers() {
    return this.getResource<Server>('servers');
  }

  public services(): Observable<Service[]> {
    return this.getResource<Service>('services');
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
}
