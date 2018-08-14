import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { HttpClient } from '@angular/common/http';
import * as camelcaseKeys from 'camelcase-keys';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { throwError, interval } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressBarService } from '@services/progress-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly baseURL = 'https://devhosts.herokuapp.com/api';
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private progressBar: ProgressBarService
  ) { }

  public registerUser(user: &User) {
    const userFormatted = this.formatAttributes(user, true);
    this.progressBar.changeState(true, 'primary');
    return this.http.post(`${AuthService.baseURL}/users`, userFormatted).pipe(
      tap((response: {data: any, errors: any[], successful: boolean}) => {
        if (response.successful) {
          const jwt = response.data.token;
          const createdUser = this.formatAttributes(response.data.user);

          localStorage.setItem('auth_tokens', JSON.stringify(jwt));
          localStorage.setItem('current_user', JSON.stringify(createdUser));
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
    return JSON.parse( localStorage.getItem('auth_tokens') );
  }

  public getCurrentUser() {
    return JSON.parse( localStorage.getItem('current_user'));
  }

  public isAuthenticated() {
    const tokens = this.getTokens();
    if (!tokens) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired( tokens.token );
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
