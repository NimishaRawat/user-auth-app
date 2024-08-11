import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: User[] = [
    { id: '1', emailOrPhone: 'test@example.com', password: 'password123', organizationName: '' },
    { id: '2', emailOrPhone: '5551234567', password: 'password123', organizationName: '' }
  ];

  private mockOrganizations: Organization[] = [
    { id: '1', name: 'ExampleCorp', isVerified: true },
    { id: '2', name: 'TestOrg', isVerified: false }
  ];

  checkUserExistence(emailOrPhone: string): Observable<boolean> {
    const userExists = this.mockUsers.some(user => user.emailOrPhone === emailOrPhone);
    return of(userExists);
  }

  validateUser(emailOrPhone: string, password: string): Observable<User | null> {
    const user = this.mockUsers.find(user => user.emailOrPhone === emailOrPhone && user.password === password);
    return of(user || null);
  }

  createUser(user: User): Observable<User> {
    this.mockUsers.push(user);
    return of(user);
  }

  verifyOrganization(organizationName: string): Observable<boolean> {
    const organization = this.mockOrganizations.find(org => org.name === organizationName);
    return of(organization ? organization.isVerified : false);
  }


  getMatchingOrganizations(query: string): Observable<string[]> {
    const matchingOrgs = this.mockOrganizations
      .filter(org => org.name.toLowerCase().includes(query.toLowerCase()))
      .map(org => org.name);
    return of(matchingOrgs);
  }
}
