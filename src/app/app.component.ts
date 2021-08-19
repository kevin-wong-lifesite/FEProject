import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getIsLoggedIn } from './login/login.selectors';
import { TokenStorageService } from './shared/services/token-storage.service';
import { AppStore } from './shared/store';
import { getUserRoles, getUserState } from './shared/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,  private store: Store<AppStore>) { }

  ngOnInit(): void {

  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}