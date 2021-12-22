import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { getIsLoggedIn } from '../login/login.selectors';
import { TokenStorageService } from '../shared/services/token-storage.service';
import { HelperService } from '../shared/services';
import { AppStore } from '../shared/store';
import { getUserRoles, getUserState } from '../shared/user';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  searchControlForm = new FormControl();
  searchOptions = [];
  username?: string;
  private subscriptions: any[] = [];

  constructor(private tokenStorageService: TokenStorageService,
  private userService: HelperService,
  private store: Store<AppStore>
    ) { }

  ngOnInit() {
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
            this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
            this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
          })
        )

        this.onChanges();
    
        this.subscriptions.push(
          this.store.pipe(getUserState).subscribe(user => {
            this.username = user.username;
          })
        )
  }

  onChanges() {
    this.searchControlForm.valueChanges.subscribe(search => {
      //on value change do a lookup to see if user matches

    })
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

}
