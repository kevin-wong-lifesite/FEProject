import { UserModel } from "../models";
import { UserActions, UserActionTypes } from "./user.actions";

export type IUserState = UserModel;

const initialState: IUserState = <IUserState>{
    username: "",
    email: "",
    id: null
}

export function userReducer(state: IUserState = initialState, action: UserActions): IUserState{
    switch (action.type) {
        case UserActionTypes.USER_LOGIN_SUCCESS: {
            return Object.assign({}, state, action.payload)
        }

        default:
            return state;
    }
}