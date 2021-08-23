import { of as observableOf, Observable } from "rxjs";

import { switchMap, mergeMap, take, catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppStore } from "./shared/store";
import { getIsLoggedIn } from "./login/login.selectors";
import { UpdateUserAction, UserActionTypes, UserService } from "./shared/user";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<AppStore>,
        private userService: UserService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        let unauthorized = () => {
            this.router.navigateByUrl("");
            return observableOf(false);
        };
        return this.store.pipe(
            getIsLoggedIn,
            take(1),
            switchMap(loggedIn => {
                //user is logged in, let them proceed
                if (loggedIn) {
                    return observableOf(true);
                } else {
                    //user is not logged in OR they have refreshed page, get the client session again to reload store
                    return this.userService.getUser().pipe(
                        mergeMap(user=>{
                            this.store.dispatch(new UpdateUserAction(user))
                            //update user and handle refresh
                            return observableOf(true);
                        }),catchError((error)=>{
                            return unauthorized();
                        })
                    )
                }

            })
        )
    }
}
