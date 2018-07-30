import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Server } from '@models/server';
import { ApiConsumerService } from '@services/api-consumer.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServersResolver implements Resolve<any[]> {
  constructor(
    private api: ApiConsumerService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.api.servers().pipe(
      this.api.propertiesToWords(),
      tap(console.log),
      map(servers => servers.map(server => {
        (server as any).cpus = server.cpu;
        delete server.cpu;
        return server;
      }))
    );
  }
}
