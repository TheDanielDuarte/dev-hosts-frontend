import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { map, tap, catchError, shareReplay, switchMap, pluck } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressBarService } from '@services/progress-bar.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly baseURL = 'https://devhosts.herokuapp.com/api';
  private readonly jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private progressBar: ProgressBarService,
    private storage: LocalStorage
  ) { }

  public registerUser(user: &User) {
    const formattedUser = this.formatAttributes(user, true);
    this.progressBar.changeState(true, 'primary');
    return this.http.post(`${AuthService.baseURL}/users`, formattedUser).pipe(
      tap((response: {data: any, errors: any[], successful: boolean}) => {
        if (response.successful) {
          const jwt = response.data.token;
          const createdUser = this.formatAttributes(response.data.user);

          this.storage.setItemSubscribe('auth_tokens', jwt);
          this.storage.setItemSubscribe('current_user', createdUser);
        }
      }),
      finalResult(),
      catchError(err => {
        const { successful, errors } = err.error;
        return throwError({ successful, errors });
      }),
      shareReplay()
    );
  }

  public getTokens(): Observable<Tokens> {
    return this.storage.getItem('auth_tokens');
  }

  public getCurrentUser(): Observable<User> {
    return this.storage.getItem('current_user');
  }

  public isAuthenticated() {
    return this.getTokens().pipe(
      map(tokens => tokens && !this.jwtHelper.isTokenExpired(tokens.token)),
    );
  }

  public timeUntilExpired() {
    return this.getTokens().pipe(
      map(tokens => {
        if (!tokens) {
          return 0;
        } else {
          const expirationDate = this.jwtHelper.getTokenExpirationDate(tokens.token);
          return expirationDate.getTime() - new Date().getTime();
        }
      })
    );
  }

  public loginUser(user: User) {
    const formattedUser = this.formatAttributes(user, true);
    this.progressBar.changeState(true, 'primary');

    return this.http.post(`${AuthService.baseURL}/users/login`, formattedUser).pipe(
      catchError(err => {
        const { successful, errors } = err.error;
        return throwError({ successful, errors });
      }),
      tap((response: {data: any, errors: any[], successful: boolean}) => {
        if (response.successful) {
          this.onSuccessfulAuthentication(response);
        }
      }),
      finalResult(),
      shareReplay()
    );
  }

  public renewToken() {
    return this.getTokens().pipe(
      switchMap(tokens => {
        if (tokens && (this.jwtHelper.isTokenExpired(tokens.token))) {
          return of(tokens);
        }
        return this.timeUntilExpired().pipe(
          switchMap((timeUntilExpired) => {
            const minutes = (timeUntilExpired / 1000) / 60;
            if (minutes < 5) {
              return of(tokens);
            }
            return throwError('User has not logged in or tokens have not expired');
          })
        );
      }),
      switchMap(tokens => this.http.post(`${AuthService.baseURL}/users/refresh-token`, {
          'refresh-token': tokens.refreshToken
        })
      ),
      tap((response: {data: any, errors: any[], successful: boolean}) => {
        if (response.successful) {
          this.storage.setItemSubscribe('auth_tokens', response.data);
        }
      }),
      switchMap(response => {
        if (response.successful) {
          return this.getTokens();
        }
        return of(null);
      }),
    );
  }

  private onSuccessfulAuthentication(response: { data: { token: any, user: any } }) {
    const jwt = response.data.token;
    const createdUser = this.formatAttributes(response.data.user);

    this.storage.setItemSubscribe('auth_tokens', jwt);
    this.storage.setItemSubscribe('current_user', createdUser as User);
  }

  private formatAttributes(obj: any, inverse = false) {
    if (!inverse) {
      return camelcaseKeys(obj);
    }

    const newObject = {  };
    Object.entries(obj).forEach(([key, value]) => {
      const updatedKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      newObject[updatedKey] = value;
    });

    return newObject;
  }

  public subscribeToProduct(productId: number, productCategory: 'storage' | 'servers' | 'services') {
    this.progressBar.changeState(true);
    return this.getCurrentUser().pipe(
      map(user => {
        const category = productCategory === 'storage' ? 'dataStorage' : productCategory;
        const { id, [category]: products } = user;

        const productsIds = products.map(product => product.id);
        return { id, productsIds };
      }),
      switchMap((user) =>
        this.http.put(`${AuthService.baseURL}/users/${user.id}`, { [productCategory]: [...user.productsIds, productId] })
      ),
      tap((response: { successful: boolean, data: &User, errors: string[] }) => {
        if (response.successful) {
          const user = this.formatAttributes(response.data);
          this.storage.setItemSubscribe('current_user', user);
        }
        this.progressBar.changeState(false);
      }),
      finalResult(),
    );
  }
}

const finalResult = () => map((res: any) => ({ successful: res.successful, errors: res.errors }));
interface Tokens { token: string; refreshToken: string; type: string; }
