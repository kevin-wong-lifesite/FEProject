import { compose, Store } from "@ngrx/store";
import { AppStore } from "../shared/store";
import { LoginPageState } from "./login.reducer";

export function getLoginPageState(state$: Store<AppStore>){
    return state$.select(state => state.loginPageState);
}

export function isLoggedIn(state$: Store<LoginPageState>) {
    return state$.select(state => state.loggedIn);
}

export function loginErro(state$: Store<LoginPageState>) {
    return state$.select(state => state.error);
}

export const getIsLoggedIn = compose(
    isLoggedIn,
    getLoginPageState
)

export const getLoginError = compose(
    loginErro,
    getLoginPageState
)
