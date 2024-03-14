import { Injectable } from '@angular/core';
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export enum Role {
  Admin = 'admin',
  Manager = 'manager',
  Auditor = 'auditor',
  Client = 'client',
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {


  private users: User[] = [
    { id: "1", name: 'Chintan Shah', email: 'chintan@example.com', role: 'admin' },
    { id: "2", name: 'Dipa Manjukar', email: 'dipa@example.com', role: 'manager' },
    { id: "2", name: 'Divyanshu Singh', email: 'divyanshu@example.com', role: 'auditor' },
    { id: "4", name: 'Rahul yadav', email: 'rahul@example.com', role: 'client' },
  ];

  roles!: Role[];


  hasRoles(requiredRoles: Role[]): boolean {
    return this.roles.some(role => requiredRoles.includes(role));
  }

  getAllUsers(): User[] {
    return this.users;
  }
  getCurrentUser(): User {
    let roleId = localStorage.getItem('roleId');

    if (roleId) {
      let index = this.users.findIndex(user => user.id == roleId);
      if (index != -1) {
        return this.users[index]
      }
    }

    return this.users[0];
  }

}
