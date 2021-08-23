import {Action} from '@ngrx/store';

import { UserModel } from '../models';

export const UserActionTypes = {
    USER_LOGIN: <"[Login] Login">"[Login] Login",
    USER_LOGIN_SUCCESS: <"[Login] Login Success">"[Login] Login Success",
    USER_UPDATE: <"[User] Update User">"[User] Update User",
    USER_LOGIN_FAIL: <"[Login] Login Fail">"[Login] Login Fail",
    USER_LOGOUT_SUCCESS: <"[Logout] Logout Success">"[Logout] Logout Success"
}

export class UserLoginAction implements Action {
    type = UserActionTypes.USER_LOGIN;

    constructor(public payload: {username: string; password: string}) {}
}


export class LoginSuccessAction implements Action {
    type = UserActionTypes.USER_LOGIN_SUCCESS;

    constructor(public payload: UserModel) {}
}

export class UpdateUserAction implements Action {
    type = UserActionTypes.USER_UPDATE;

    constructor(public payload: UserModel) {}
}

export class LoginFailAction implements Action {
    type = UserActionTypes.USER_LOGIN_FAIL;

    constructor(public payload: any) {}
}

export class LogoutSuccessAction implements Action {
    type = UserActionTypes.USER_LOGOUT_SUCCESS;
}

export type UserActions = LoginSuccessAction | LogoutSuccessAction | UserLoginAction | LoginFailAction | UpdateUserAction;