import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-c-header',
  templateUrl: './c-header.component.html',
  styleUrls: ['./c-header.component.scss'],
})
export class CHeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userDetails: any;
  nameInitial: string = '';
  userPhotoUrl: string | undefined;
  showUserDetails: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout() {
    this.showUserDetails = false;
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated.subscribe((data: boolean) => {
      this.isAuthenticated = data;

      if (this.isAuthenticated) {
        this.userDetails = this.authService.getUserDetails();
        this.nameInitial = this.sharedService.getInitials(
          this.userDetails?.name
        );
        if (
          this.userDetails.photoUrl === undefined ||
          this.userDetails.photoUrl === null
        ) {
          this.userPhotoUrl = undefined;
        } else {
          this.userPhotoUrl = this.userDetails.photoUrl;
        }
      }
    });
  }

  authenticate() {
    this.router.navigate(['/auth']);
  }

  logOut() {
    this.authService.logOut();
  }

  showUserDetailsPanel(event: any) {
    this.showUserDetails = !this.showUserDetails;
    event.stopPropagation();
  }
}
