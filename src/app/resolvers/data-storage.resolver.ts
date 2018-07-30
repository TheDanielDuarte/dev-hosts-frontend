import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ApiConsumerService } from '@services/api-consumer.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageResolver implements Resolve<any[]> {
  constructor(private api: ApiConsumerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.dataStorage().pipe(
      this.api.propertiesToWords()
    );
  }
}
