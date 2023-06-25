import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    GoogleSigninButtonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
