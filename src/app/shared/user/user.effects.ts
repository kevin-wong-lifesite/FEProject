import { Inject, Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { from as observableFrom, Observable } from "rxjs";
import { Action } from "@ngrx/store";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { UserModel } from "../models";
import { AuthService } from "../services";
import { LoginSuccessAction, UserActionTypes } from "./user.actions";
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
            console.log(payload,"SDFDSF")
            return this.authService.login("test","test").pipe(
                map(user => new LoginSuccessAction(user))
            )
        }
        )
    );

}