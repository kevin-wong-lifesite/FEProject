import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { Store } from "@ngrx/store";
import { AppStore } from '../shared/store';
import { UserLoginAction } from '../shared/user';
import { ThrowStmt } from '@angular/compiler';
import { getIsLoggedIn, getLoginError } from './login.selectors';
import { getUserRoles } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private subscriptions: any[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private store: Store<AppStore>) { }

  ngOnInit(): void {

    //listen for login state
    this.subscriptions.push(
      this.store.pipe(getIsLoggedIn).subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
      })
    )

    //get user roles
    this.subscriptions.push(
      this.store.pipe(getUserRoles).subscribe(roles => {
        this.roles = roles;
      })
    )

      //listen for login state
    this.subscriptions.push(
        this.store.pipe(getLoginError).subscribe(loginErr => {
          if (loginErr) {
            this.isLoginFailed = true;
            this.errorMessage = loginErr.message;
          }
        })
      )
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.store.dispatch(new UserLoginAction({username: username,password: password}))

    // this.authService.login({username, password}).subscribe(
    //   data => {
    //     this.tokenStorage.saveToken(data.accessToken);
    //     this.tokenStorage.saveRefreshToken(data.refreshToken);
    //     this.tokenStorage.saveUser(data);

    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.tokenStorage.getUser().roles;
    //     // this.reloadPage();
    //   },
    //   err => {
    //     this.errorMessage = err.error.message;
    //     this.isLoginFailed = true;
    //   }
    // );
  }

}
