import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {User} from './user.model';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup = new FormGroup({
    'email': new FormControl(null, Validators.required),
    'password': new FormControl(null, Validators.required)
  });
  isSignInMode = true;
  errorMessage: String = null;
  errorSubscription: Subscription;
  userSubscription: Subscription;


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.userChanged.subscribe((user) => {
      if (!!user) {
        this.router.navigateByUrl('project-list');
      } else {
        this.router.navigateByUrl('');
      }
    });
    this.errorSubscription = this.authService.errorOccurred.subscribe((err: any) => {
      this.errorMessage = err;
    });
  }

  onSubmit() {
    const user: User = this.authForm.value;
    if (this.isSignInMode) {
      this.authService.signIn(user.email, user.password);
    } else {
      this.authService.signUp(user.email, user.password);
    }
    this.authForm.reset();
  }

  onSignUp() {
    this.isSignInMode = false;
  }

  onSignIn() {
    this.isSignInMode = true;
  }

  onClearErrorMessage() {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
