import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { throwError, interval } from 'rxjs';
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
    const userFormatted = this.formatAttributes(user, true);
    this.progressBar.changeState(true, 'primary');
    return this.http.post(`${AuthService.baseURL}/users`, userFormatted).pipe(
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

  public loginUser() {
  }

  public renewToken() {
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
