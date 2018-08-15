import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@services/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method.toLocaleLowerCase() === 'post' && req.url === 'https://devhosts.herokuapp.com/api/users') {
      return next.handle(req);
    }

    return this.auth.getTokens().pipe(
      switchMap(tokens => {
        const request = req.clone({
          setHeaders: {
            Authorization: `Bearer ${tokens.token}`
          }
        });

        return next.handle(request);
      })
    );
  }
}
