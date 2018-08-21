import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { map, tap, catchError, shareReplay, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressBarService } from '@services/progress-bar.service';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly baseURL = 'https://devhosts.herokuapp.com/api';
  private jwtHelper = new JwtHelperService();

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
      map((res: any) => ({ successful: res.successful, errors: res.errors })),
      catchError(err => {
        const { successful, errors } = err.error;
        return throwError({ successful, errors });
      }),
      shareReplay()
    );
  }

  public getTokens() {
    return this.storage.getItem('auth_tokens');
  }

  public getCurrentUser() {
    return this.storage.getItem('current_user');
  }

  public isAuthenticated() {
    return this.getTokens().pipe(
      map(tokens => tokens && !this.jwtHelper.isTokenExpired(tokens.token)),
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
      map((res: any) => ({ successful: res.successful, errors: res.errors })),
      shareReplay()
    );
  }

  public renewToken() {
    return this.getTokens().pipe(
      switchMap(tokens => {
        if (tokens && this.jwtHelper.isTokenExpired(tokens.token)) {
          return of(tokens);
        }
        return throwError('User has not logged in or tokens have not expired');
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
      map(response => response.successful),
    );
  }

  private onSuccessfulAuthentication(response: { data: { token: any, user: any } }) {
    const jwt = response.data.token;
    const createdUser = this.formatAttributes(response.data.user);

    this.storage.setItemSubscribe('auth_tokens', jwt);
    this.storage.setItemSubscribe('current_user', createdUser);
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
}
