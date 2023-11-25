import { HttpStatusCode } from "axios";
import { initialState } from "../initialState";

const SET_ITEM = 'resetPassword/setItem';
const SET_PASSWORD_SENT = 'resetPassword/setPasswordSent';
const INIT_RESET_PASSWORD_DATA = 'resetPassword/initResetPasswordData';
const SET_RESET_PASSWORD_RESPONSE_CODE = 'resetPassword/responseCode';
const SET_RESET_PASSWORD_FAILURE_RESPONSE_CODE = 'resetPassword/failureresponseCode'

// Action Creators
export const setItem = (id, value) => ({
    type: SET_ITEM,
    payload: [id, value],
});

export const setPasswordSent = (value) => ({
    type: SET_PASSWORD_SENT,
    payload: value,
});

export const initResetPasswordData = () => ({
    type: INIT_RESET_PASSWORD_DATA,
});

export const resetPasswordResponseCode = () => ({
    type: SET_RESET_PASSWORD_RESPONSE_CODE
})


export const resetPasswordFailureResponseCode = error => ({
    type: SET_RESET_PASSWORD_FAILURE_RESPONSE_CODE,
    payload: error
})


export const resetPasswordReducer = (state = initialState.resetPassword, action) => {
    switch (action.type) {
        case SET_ITEM:
            const [id, value] = action.payload;
            return {
                ...state,
                [id]: value

            };

        case SET_PASSWORD_SENT:
            return {
                ...state,
                passwordSent: action.payload,
            };

        case INIT_RESET_PASSWORD_DATA:
            return {
                password: "",
                verifyPassword: "",
                passwordSent: false,
            };

        case SET_RESET_PASSWORD_RESPONSE_CODE: {
            return {
                ...state,
                validResponseCode: HttpStatusCode.Ok
            }
        }
        case SET_RESET_PASSWORD_FAILURE_RESPONSE_CODE: {
            const { error: { message } } = action;
            const messageParts = message.split(" ");
            const lastPart = messageParts[messageParts.length - 1]
            return {
                ...state,
                validResponseCode: parseInt(lastPart)
            }
        }
        default:
            return state;
    }
};