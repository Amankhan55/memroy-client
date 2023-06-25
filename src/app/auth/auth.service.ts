import {
  GoogleLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostsService } from '../posts/service/posts.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getAccessToken(PROVIDER_ID: string) {
    throw new Error('Method not implemented.');
  }
  isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private googleAuthService: SocialAuthService,
    private postService: PostsService
  ) {
    if (this.getUserDetails() === null || this.getUserDetails() === undefined) {
      this.isAuthenticated.next(false);
    } else {
      this.isAuthenticated.next(true);
    }
  }

  setUserDataAndToken(data: any) {
    let token = data?.token;
    let userDetails = data?.result;

    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    localStorage.setItem('token', token);

    this.isAuthenticated.next(true);
  }

  // setGoogleAccessToken(accessToken: any) {
  //   let googleAccessToken = accessToken;
  //   console.log(googleAccessToken);
  //   debugger;
  //   localStorage.setItem('token', googleAccessToken);
  // }

  setGoogleUserDetails(userDetails: any) {
    let token = userDetails?.idToken;
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    localStorage.setItem('token', token);

    this.isAuthenticated.next(true);
  }

  getUserDetails() {
    let userDetails: any = localStorage.getItem('userDetails');
    return JSON.parse(userDetails);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  clearLocalStorage() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('token');
  }

  tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }

  logOut() {
    this.clearLocalStorage();
    this.googleAuthService.signOut();
    this.isAuthenticated.next(false);
    this.postService.refreshPostEvent.next(true);
  }

  login(payload: any) {
    const url = `http://localhost:5000/user/signin`;
    return this.http.post(url, payload);
  }

  register(payload: any) {
    const url = `http://localhost:5000/user/signup`;
    return this.http.post(url, payload);
  }
}
