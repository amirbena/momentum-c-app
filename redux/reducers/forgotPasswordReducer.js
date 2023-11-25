import { HttpStatusCode } from "axios";
import { initialState } from "../initialState";

export const FORGOT_PASSWORD_TYPES = {
    setEmail: '/forgotPassword/SetEmail',
    setEmailSent: '/forgotPassword/SetEmailSent',
    initForgotPasswordData: '/forgotPassword/initForgotPasswordData',
    setValidResponseCode: '/forgotPassword/setValidResponseCode',
    setFailureResponseCode: '/forgotPassword/setFailureResponseCode'
}

export const forgotPasswordReducer = (state = initialState.forgotPassword, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_TYPES.setEmail: {
            return {
                ...state,
                email: action.payload
            }
        }
        case FORGOT_PASSWORD_TYPES.setEmailSent: {
            return {
                ...state,
                emailSent: action.payload
            }
        }
        case FORGOT_PASSWORD_TYPES.initForgotPasswordData: {
            return {
                ...initialState,
            }
        }
        case FORGOT_PASSWORD_TYPES.setValidResponseCode: {
            return {
                ...state,
                validResponseCode: action.payload
            }
        }

        case FORGOT_PASSWORD_TYPES.setFailureResponseCode: {
            const { payload: { message } } = action;
            const messageParts = message.split(" ");
            const lastPart = messageParts[messageParts.length - 1]
            state.validResponseCode = parseInt(lastPart);
            return {
                ...state,
                validResponseCode: lastPart ? parseInt(lastPart) : HttpStatusCode.InternalServerError
            }
        }

        default: {
            return state;
        }
    }
}

export const setEmail = email => ({
    type: FORGOT_PASSWORD_TYPES.setEmail,
    payload: email
});


export const setEmailSent = emailSent => ({
    type: FORGOT_PASSWORD_TYPES.setEmailSent,
    payload: emailSent
});


export const initForgotPasswordData = () => ({
    type: FORGOT_PASSWORD_TYPES.initForgotPasswordData
})

export const setForgotPasswordValidCode = responseCode => ({
    type: FORGOT_PASSWORD_TYPES.setValidResponseCode,
    payload: responseCode
})

export const setForgotPasswordFailureResponseCode = error => ({
    type: FORGOT_PASSWORD_TYPES.setFailureResponseCode,
    payload: error
})