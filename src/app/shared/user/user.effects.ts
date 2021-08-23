import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { from as observableFrom, Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { UserModel } from "../models";
import { AuthService, TokenStorageService } from "../services";
import { LoginFailAction, LoginSuccessAction, UserActionTypes } from "./user.actions";
import { UserService } from "./user.service";
import { Token } from "@angular/compiler/src/ml_parser/lexer";
import { LoginPageSuccessAction } from "src/app/login/login.actions";
@Injectable()
export class UserEffects {
    constructor(
        private updates$: Actions,
        private userService: UserService,
        private authService: AuthService,
        private tokenService: TokenStorageService
    ) {}

    @Effect() login$$: Observable<Action> = this.updates$.pipe(
        ofType(UserActionTypes.USER_LOGIN),
        switchMap(({ payload }) => {
            return this.authService.login(payload).pipe(
                mergeMap(user => {
                    TokenStorageService.accessToken = user.accessToken;
                    TokenStorageService.refreshToken = user.refreshToken;
                    return observableFrom([
                        new LoginSuccessAction(user),
                        new LoginPageSuccessAction()
                    ])
                   }),
                catchError(error => of(new LoginFailAction(error)))
            )
        }
        )
    );

    @Effect() loginError$$: Observable<Action> = this.updates$.pipe(
        ofType(UserActionTypes.USER_LOGIN_SUCCESS),
        mergeMap(({ payload }) => {
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