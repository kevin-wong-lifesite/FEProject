import { LoginActions, LoginActionTypes } from "./login.actions";

export interface LoginPageState {
    loggedIn: boolean;
    error: any;
}

const initialState: LoginPageState = <LoginPageState> {
    loggedIn: false,
    error: null
}

export function loginPageReducer(
    state: LoginPageState = initialState,
    action: LoginActions
): LoginPageState {
    switch(action.type) {
        case LoginActionTypes.LOGIN_SUCCESS: {
            return Object.assign({}, state, {
                loggedIn: true
            })
        }

        default:
            return state;
    }

    
}