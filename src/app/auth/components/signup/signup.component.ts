import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  step = 1;
  emailOrPhone: string = '';
  name: string = '';
  password: string = '';
  organizationId: string = '';
  designation: string = '';
  birthDate: Date | null = null;
  city: string = '';
  pincode: string = '';
  organizations: any[] = [];
  signupError: string = '';

  constructor(private authService: AuthService) {
    this.organizations = this.authService.getOrganizations();
  }

  onNext() {
    if (this.step === 1) {
      this.step = 2;
    } else {
      // Complete Signup
      if (!this.authService.validateOrganization(this.organizationId)) {
        this.signupError = 'Unknown organization-id';
      } else {
        alert('Signup successful!');
      }
    }
  }

  onBack() {
    this.step = 1;
  }
}
