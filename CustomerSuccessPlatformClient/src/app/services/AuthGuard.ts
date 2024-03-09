import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthorizationService, Role } from './authorization.service'; // Import AuthorizationService and Role

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private authorizationService: AuthorizationService, private router: Router) {}


  canActivate(): Observable<boolean> {

    return this.authService.isAuthenticated$.pipe(
      tap(isAuthenticated => {
        if (isAuthenticated) {
          const userRole = this.authorizationService.getCurrentUser()?.role;
          if (userRole) {
            switch (userRole) {
              case Role.Admin:

                break;
              case Role.Manager:
                this.router.navigate(['/dashboard/project']);
                break;
              case Role.Auditor:
                this.router.navigate(['/dashboard/project']);
                break;
              case Role.Client:
            
                break;
              default:
                break;
            }
          }
        } else {
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
