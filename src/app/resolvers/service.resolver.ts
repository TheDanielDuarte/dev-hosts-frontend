import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ApiConsumerService } from '@services/api-consumer.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceResolver implements Resolve<any[]> {
  constructor(private api: ApiConsumerService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.services().pipe(
      map(services => services.map(service => {
        service.data = this.api.propertiesToWords(service.data);
        return service;
      })),
      map(services => services.map(service => service.data)),
    );
  }
}
