import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {uuid} from 'uuidv4';
import {User} from './user.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  userChanged = new Subject<User>();
  userChangedLast = new BehaviorSubject<User>(null);
  errorOccurred = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  static storeUser(user: User) {
    const userData = {...user, token: uuid()}; // Fake token generation
    localStorage.setItem('user', JSON.stringify(userData));
  }

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  signUp(email: string, password: string) {
    this.getUser(email).subscribe(
      (response: User[]) => {
        if (response.length > 0) {
          this.errorOccurred.next('User already exists. Sign in!');
        } else {
          const url = 'http://localhost/users';
          const encodedPassword = btoa(password); // Fake encryption
          this.httpClient.post<User>(url, {id: null, email: email, password: encodedPassword}, this.httpOptions).subscribe(
            (user: User) => {
              this.userChanged.next(user);
              this.userChangedLast.next(user);
              AuthService.storeUser(user);
            },
            err => {
              this.handleError(err);
            });
        }
      },
      err => {
        this.handleError(err);
      });
  }

  signIn(email: string, password: string) {
    this.getUser(email).subscribe(
      (response: User[]) => {
        if (response.length > 0) {
          const user = response.pop();
          if (!this.checkPassword(user.password, password)) {
            this.errorOccurred.next('Wrong password!');
            return;
          }
          this.userChanged.next(user);
          this.userChangedLast.next(user);
          AuthService.storeUser(user);
        } else {
          this.errorOccurred.next('User not found. Sign up!');
        }
      },
      err => {
        this.handleError(err);
      });
  }

  logout() {
    this.userChanged.next(null);
    localStorage.removeItem('user');
    this.router.navigateByUrl('auth');
  }

  getUser(email: string): Observable<User[]> {
    const url = 'http://localhost/users' + '?email=' + email;
    return this.httpClient.get<User[]>(url, this.httpOptions);
  }

  handleError(err: any): void {
    this.errorOccurred.next(err.message);
  }

  checkPassword(password: string, input: string) {
    return atob(password) === input;
  }

  isAuthorized() {
    return this.userChangedLast.pipe(map((user) => {
      return !!user;
    }));
  }
}
