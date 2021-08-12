import { IUserState } from "./user/user.reducer";

export interface AppStore {
    user: IUserState
}