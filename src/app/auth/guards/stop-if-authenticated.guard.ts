import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StopIfAuthenticatedGuard implements CanActivate {
  constructor(
    private auth: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated().pipe(
      map(isAuthenticated => !isAuthenticated)
    );
  }
}
