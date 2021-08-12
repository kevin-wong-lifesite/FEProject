import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { IUserState, userReducer } from "./user/user.reducer";

export interface AppStore {
    user: IUserState
}

export const reducers: ActionReducerMap<AppStore> = {
    user: userReducer
}

export let metaReducers: MetaReducer<AppStore>[] = [];
