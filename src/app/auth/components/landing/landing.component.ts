import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkUser } from '../../state/auth.actions';
import { Router } from '@angular/router';
import { selectIsExistingUser } from '../../state/auth.selectors';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  emailOrPhone: string = '';

  constructor(private store: Store, private router: Router) {}

  onSubmit() {
    this.store.dispatch(checkUser({ emailOrPhone: this.emailOrPhone }));
    this.store.select(selectIsExistingUser).subscribe(isExistingUser => {
      this.router.navigate([isExistingUser ? '/auth/login' : '/auth/signup']);
    });
  }
}
