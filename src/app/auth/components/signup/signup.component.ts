import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { signup, signupStep } from '../../state/auth.actions';
import { selectStep } from '../../state/auth.selectors';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  step = 1;
  user: User = { id: '', emailOrPhone: '', password: '', organizationName: '' };
  stepData: any = {};
  organizationVerified = true;
  filteredOrganizations$: Observable<string[]> | undefined;


  constructor(private store: Store, private authService: AuthService) {
    this.store.select(selectStep).subscribe(step => {
      this.step = step;
    });
  }

  onOrganizationNameInput() {
    this.filteredOrganizations$ = this.authService.getMatchingOrganizations(this.stepData.organizationName).pipe(
      map(orgs => {
        if (orgs.length === 0) {
          this.organizationVerified = false;
        } else {
          this.organizationVerified = true;
        }
        return orgs;
      })
    );
  }

  onNext() {
    if (this.step === 1) {
      this.store.dispatch(signupStep({ step: 2 }));
    } else if (this.step === 2) {
      if (this.organizationVerified) {
        this.user.organizationName = this.stepData.organizationName;
        this.store.dispatch(signup({ user: this.user }));
      } else {
        alert('Organization is not verified.');
      }
    }
  }

  onBack() {
    this.store.dispatch(signupStep({ step: 1 }));
  }
}
