import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  SocialLoginModule,
  GoogleSigninButtonModule,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorInterceptor } from './shared/services/global-error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    SharedModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalErrorInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '558991006616-n6n1dm4jp1ih8vko2of308ocpv2rasqb.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
