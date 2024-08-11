import { Component, OnInit } from '@angular/core';
import { login } from '../../state/auth.actions';
import {Store, select } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthState } from '../../state/auth.state';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  emailOrPhone: string='';
  password: string='';
  user$: Observable<User | null>;
  error$: Observable<string | null>;


  constructor(private store: Store<{ auth: AuthState }>) {
    this.user$ = this.store.pipe(select(state => state.auth.user));
    this.error$ = this.store.pipe(select(state => state.auth.error));

  }

  ngOnInit() {
    this.user$
      .pipe(
        filter(user => !!user),
        tap(user => {
          if (user) {
            alert(`Welcome ${user.emailOrPhone}!`);
          }
        })
      )
      .subscribe();

    // Subscribe to error changes and show an error message if login fails
    this.error$
      .pipe(
        filter(error => !!error),
        tap(error => {
          if (error) {
            alert(`Error: ${error}`);
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.store.dispatch(login({ emailOrPhone: this.emailOrPhone, password: this.password }));
  }
}
