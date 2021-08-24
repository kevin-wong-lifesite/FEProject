import { compose, Store } from "@ngrx/store";
import { AppStore } from "../store";
import { IUserState } from "./user.reducer";

export function getUserState(state$: Store<AppStore>){
    return state$.select(state => state.user);
}

export function userRoles(state$: Store<IUserState>) {
    return state$.select(state => state.roles);
}

export function userId(state$: Store<IUserState>) {
    return state$.select(state => state.id);
}

export const getUserId= compose(
    userId,
    getUserState
)

export const getUserRoles = compose(
    userRoles,
    getUserState
)
