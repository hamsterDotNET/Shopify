import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationComponent } from './authentication.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    FormsModule,
    RouterModule.forChild([{ path: 'auth', component: AuthenticationComponent }]),
    SharedModule
  ]
})
export class AuthModule { }
