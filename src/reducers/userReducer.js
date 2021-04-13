import {SIGN_IN, SIGN_OUT} from "../_actions/actionTypes"

export function userReducer(state = {isAuthorised: false, nick: ""}, action) {
    switch (action.type) {
        case SIGN_IN:
            return {
                isAuthorised: true,
                nick: action.nick
            };
        case SIGN_OUT:
            return {
                isAuthorised: false
            };
        default:
            return {
                isAuthorised: true,
                nick: action.nick
            };
    }
}