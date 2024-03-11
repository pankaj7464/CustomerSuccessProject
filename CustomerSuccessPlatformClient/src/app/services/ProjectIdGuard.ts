import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProjectIdGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(): boolean {
        const projectId = localStorage.getItem('projectId');
        if (projectId) {
            return true;
        } else {
            this.router.navigate(['dashboard/project']);
            return false;
        }
    }
}
