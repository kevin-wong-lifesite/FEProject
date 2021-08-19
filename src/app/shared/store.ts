import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loginPageReducer, LoginPageState } from "../login/login.reducer";
import { IUserState, userReducer } from "./user/user.reducer";

export interface AppStore {
    user: IUserState,
    loginPageState: LoginPageState
}

export const reducers: ActionReducerMap<AppStore> = {
    user: userReducer,
    loginPageState: loginPageReducer
}

export let metaReducers: MetaReducer<AppStore>[] = [];
