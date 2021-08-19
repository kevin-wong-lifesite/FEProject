import {Action} from '@ngrx/store';

export const LoginActionTypes = {
    LOGIN_SUCCESS: <"[Login] Login Successful">"[Login] Login Successful",
    USER_LOGIN_FAIL: <"[Login] Login Fail">"[Login] Login Fail",
    USER_LOGOUT_SUCCESS: <"[Logout] Logout Success">"[Logout] Logout Success"
}


export class LoginPageSuccessAction implements Action {
    type = LoginActionTypes.LOGIN_SUCCESS;

    constructor() {}
}

export type LoginActions = LoginPageSuccessAction;