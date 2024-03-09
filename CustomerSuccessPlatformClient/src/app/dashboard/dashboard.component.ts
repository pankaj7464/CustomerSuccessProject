import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isLoading: boolean;
  constructor(public router: Router, public apiService: ApiService, private cdr: ChangeDetectorRef, @Inject(DOCUMENT) public document: Document,
    public authService: AuthService) {
    this.authService.user$.subscribe(user => {
      console.log(user);
    });
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.apiService.isLoading().subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
  Navigations = [
    { path: 'project', displayName: 'Project' },
    { path: 'project-manager', displayName: 'Project Manager' },
    { path: 'settings', displayName: 'Settings' },
  ];


  logout() {
    this.authService.logout({
      logoutParams: {
        returnTo: "http://localhost:4200/login"
      }
    });
  }

}
