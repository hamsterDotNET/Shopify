import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { User } from './user-model';
import { environment } from 'src/environments/environment';

export interface AuthResponseData{
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly lsKey = 'userData';
  private tokenTimeout: any = null;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin(){
    const userData: {
      email: string,
      id: string,
      _token: string
      _tokenExpires: string
    } = JSON.parse(localStorage.getItem(this.lsKey));

    if (!userData){
      console.log('No user data available in local storage.');
      return false;
    }

    const expiresIn = new Date(userData._tokenExpires);
    const user = new User(userData.email, userData.id, userData._token, expiresIn);
    if (!user.token){
      console.log(`User token has expired: ${expiresIn}`);
      return false;
    }

    this.user.next(user);

    const expirationDuration = expiresIn.getTime() - new Date().getTime();
    this.autoLogout(expirationDuration);
  }

  autoLogout(interval: number){
    this.tokenTimeout = setTimeout(() => this.signOut(), interval);
  }

  signin(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
      tap(response =>{
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }));
  }

  signOut(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem(this.lsKey);
    if (this.tokenTimeout){
      clearTimeout(this.tokenTimeout);
    }
    this.tokenTimeout = null;
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError),
      tap(response =>{
        this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      }));
  }

  private handleAuthentication(email: string, id: string, token: string, tokenExpiresIn: number){
    const expiresMs = tokenExpiresIn * 1000;
    const expiresOn = new Date(new Date().getTime() + expiresMs);
    const user = new User(
      email,
      id,
      token,
      expiresOn);

    this.user.next(user);
    this.autoLogout(expiresMs);

    localStorage.setItem(this.lsKey, JSON.stringify(user));
}

  private handleError(errorResp: HttpErrorResponse){
    let errorMsg = `An unknown error (${errorResp.status}) has occured.`;
    console.log(errorResp);

    if (errorResp.error && errorResp.error.error){
      switch (errorResp.error.error.message){
        case 'EMAIL_EXISTS':
          errorMsg = 'An account already exists for the given e-mail.';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMsg = 'Invalid email account or the account has been deleted.';
          break;
        case 'INVALID_LOGIN_CREDENTIALS':
          errorMsg = 'The e-mail or password is invalid.';
          break;
        case 'INVALID_PASSWORD':
          errorMsg = 'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMsg = 'The account has been disabled. Please contact the administrator.';
          break;
      }
    }
    return throwError(errorMsg);
  }
}
