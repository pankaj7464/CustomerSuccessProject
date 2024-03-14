import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import 'jspdf-autotable';
import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileModalComponent } from '../components/profile-modal/profile-modal.component';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userDetail!: any
  isLoading: boolean;
  constructor(public dialog: MatDialog, public router: Router, public apiService: ApiService, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) public document: Document,
    public authService: AuthService, public authorizationService: AuthorizationService) {

    this.authService.user$.subscribe(userDetail => {
      this.userDetail = userDetail;
      this.apiService.login(this.userDetail.email).subscribe(user => {
        user = JSON.parse(user);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("roleId", user.role);
          this.userDetail = { ...userDetail, roleId: user.role };
        }

        else {
          this.authService.logout({
            logoutParams: {
              returnTo: "http://localhost:4200/login"
            }
          });
        }
      },
        error => {
          console.log(error);
        }
      )
    });
    this.isLoading = false;
  }
  ngOnInit(): void {
    this.apiService.isLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  Navigations = [
    { path: 'dashboard/project', displayName: 'Project' },
    { path: 'project-manager', displayName: 'Project Manager' },
    { path: 'settings', displayName: 'Settings' },
  ];

  isProjectPage() {
    const currentUrl = this.router.url
    return currentUrl != "/dashboard/project"
  }
  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: "http://localhost:4200/login"
      }
    });
  }
  navigateTo(path: string) {
    // throw new Error('Method not implemented.');
    this.router.navigate([path])
  }


  openDialog() {
    this.dialog.open(ProfileModalComponent);
  }
}
