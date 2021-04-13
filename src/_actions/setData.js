export const SET_DATA = 'SET_DATA';

export function setData(usData) {
    return{
        type: SET_DATA,
        usData: usData
    }
}