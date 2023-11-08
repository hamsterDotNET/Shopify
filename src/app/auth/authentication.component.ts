import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
  isLoading = false;
  error: string = null;

  constructor(private authSrvc: AuthenticationService, private router: Router){}

  onHandleError(){
    this.error = null;
  }

  onSignUp(form: NgForm){
    this.doAuthRequest(true, form.value);
    form.reset();
  }

  onSubmit(form: NgForm){
    this.doAuthRequest(false, form.value);
    form.reset();
  }

  private doAuthRequest(isSignUp, value: any){
    this.isLoading = true;
    this.error = null;

    let authSrvcObsv: Observable<AuthResponseData> = isSignUp
      ? this.authSrvc.signup(value.email, value.password)
      : this.authSrvc.signin(value.email, value.password);

    authSrvcObsv.subscribe(response =>{
      console.log(response);
      this.router.navigate(['/recipe-book']);
      this.isLoading = false;
    },
    error =>{
      this.error = error;
      this.isLoading = false;
    });
  }
}
