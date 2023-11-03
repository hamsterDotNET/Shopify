import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user-model';

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

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signin(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqjfzJNNbsGND_VpRP-OAEuyYfohXLIVs',
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

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqjfzJNNbsGND_VpRP-OAEuyYfohXLIVs',
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
    const expiresOn = new Date(new Date().getTime() + tokenExpiresIn * 1000);
    const user = new User(
      email,
      id,
      token,
      expiresOn);

    this.user.next(user);
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
