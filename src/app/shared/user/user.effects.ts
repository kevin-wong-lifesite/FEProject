import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { from as observableFrom, Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { UserModel } from "../models";
import { AuthService } from "../services";
import { LoginFailAction, LoginSuccessAction, UserActionTypes } from "./user.actions";
import { UserService } from "./user.service";
import {tap} from 'rxjs/internal/operators'
@Injectable()
export class UserEffects {
    constructor(
        private updates$: Actions,
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Effect() login$$: Observable<Action> = this.updates$.pipe(
        ofType(UserActionTypes.USER_LOGIN),
        switchMap(({ payload }) => {
            return this.authService.login(payload).pipe(
                map(user => new LoginSuccessAction(user)),
                catchError(error => of(new LoginFailAction(error)))
            )
        }
        )
    );

    @Effect() loginError$$: Observable<Action> = this.updates$.pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCESS),
        mergeMap(({ payload }) => {
            console.log(payload,"succs")
            return observableFrom([])
        }
        )
    );

    @Effect() loginSuccess$$: Observable<Action> = this.updates$.pipe(
        ofType(UserActionTypes.USER_LOGIN_FAIL),
        mergeMap(({ payload }) => {
            console.log(payload,"FUAL")
            return observableFrom([])
        }
        )
    );

}