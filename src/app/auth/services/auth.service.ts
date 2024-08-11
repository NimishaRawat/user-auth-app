import { Injectable } from '@angular/core';
import * as usersData from '../../../assets/mocks/users.json';
import * as orgData from '../../../assets/mocks/organizations.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = (usersData as any).default;
  private organizations = (orgData as any).default;

  validateUser(emailOrPhone: string, password: string): boolean {
    return this.users.some((user: any) => user.emailOrPhone === emailOrPhone && user.password === password);
  }

  validateOrganization(orgId: string): boolean {
    return this.organizations.some((org: any) => org.id === orgId);
  }

  getOrganizations() {
    return this.organizations;
  }
}
