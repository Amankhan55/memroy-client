import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginFormActive = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private googleAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.createRegisterForm();

    // this.googleAuthService
    //   .getAccessToken(GoogleLoginProvider.PROVIDER_ID)
    //   .then((accessToken: any) => {
    //     this.authService.setGoogleAccessToken(accessToken);
    //   });

    this.googleAuthService.authState.subscribe((user) => {
      if (user) {
        this.authService.setGoogleUserDetails(user);
        this.router.navigateByUrl('/');
      }
    });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  showRegisterForm() {
    this.isLoginFormActive = false;
    this.createRegisterForm();
  }

  showLoginForm() {
    this.isLoginFormActive = true;
    this.createLoginForm();
  }

  registerUser() {
    if (this.registerForm?.valid) {
      let registerPayload = this.registerForm.value;
      this.authService.register(registerPayload).subscribe((res: any) => {
        console.log(res);
        this.registerForm.reset();
        this.showLoginForm();
      });
    }
  }

  loginUser() {
    if (this.loginForm?.valid) {
      let loginPayload = this.loginForm.value;
      this.authService.login(loginPayload).subscribe((res: any) => {
        console.log(res);
        this.authService.setUserDataAndToken(res);
        this.router.navigateByUrl('/');
      });
    }
  }
}
