import {SIGN_IN, SIGN_OUT, SIGN_UP, ADD_POINT} from "./actionTypes"

export const signUp = (nick) => ({
    type: SIGN_UP,
    nick: nick,
    isAuthorised: true
});

export const signOut = () => ({
    type: SIGN_OUT,
    isAuthorised: false,
    nick: '',
});

export const signIn = (nick) => ({
    type: SIGN_IN,
    nick: nick,
    isAuthorised: true
});

export const addPoint = (x,y,r) => ({
    type: ADD_POINT,
    x: x,
    y: y,
    r: r
});