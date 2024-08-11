import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    const isValid = this.authService.validateUser(this.emailOrPhone, this.password);
    if (isValid) {
      // Show success modal or proceed further
      alert('Login successful!');
    } else {
      this.loginError = 'Invalid email/phone number or password!';
    }
  }
}
