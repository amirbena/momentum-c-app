import { initialState } from "../initialState";

const SET_SELLS = '/sells/setSells'

export const sellsReducer = (state = initialState.sells, action) => {
    switch (action.type) {
        case SET_SELLS: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};

export const setSells = (sells) => ({
    type: SET_SELLS,
    payload: sells
})