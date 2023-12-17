import { HttpStatusCode } from "axios";
import { initialState } from "../initialState"

export const LOGIN_TYPES = {
    setLoginUser: '/login/setLoginUser',
    initLoginData: '/login/initLoginData',
    setShowError: '/login/setShowError',
    setValidResponseCode: '/login/setValidResponseCode',
    setLoginSuccess: '/login/success',
    setLoginFailure: '/login/failure'
}

export const loginReducer = (state = initialState.login, action) => {
    switch (action.type) {
        case LOGIN_TYPES.setLoginUser: {
            if (!action.payload || !action.payload.length) return state;
            const [key, value] = action.payload;
            return {
                ...state,
                [key]: value
            }
        }
        case LOGIN_TYPES.initLoginData: {
            return {
                ...initialState.login,
            }
        }
        case LOGIN_TYPES.setShowError: {
            return {
                ...state,
                showError: action.payload
            }
        }
        case LOGIN_TYPES.setValidResponseCode: {
            return {
                ...state,
                responseCode: action.payload
            }
        }

        case LOGIN_TYPES.setLoginSuccess: {
            return {
                ...state,
                validResponseCode: HttpStatusCode.Ok,
                showError: true
            }
        }

        case LOGIN_TYPES.setLoginFailure: {
            const { payload: { message } } = action;
            const messageParts = message.split(" ");
            const lastPart = messageParts[messageParts.length - 1]
            return {
                ...state,
                validResponseCode: lastPart ? parseInt(lastPart) : HttpStatusCode.InternalServerError,
                showError: true
            }
        }

        default: {
            return state;
        }
    }
}

export const setLoginUser = loginKeyValueArray => ({
    type: LOGIN_TYPES.setLoginUser,
    payload: loginKeyValueArray
})

export const initLoginData = () => ({
    type: LOGIN_TYPES.initLoginData
})

export const setLoginShowError = showError => ({
    type: LOGIN_TYPES.setShowError,
    payload: showError
});


export const setLoginValidResponseCode = responseCode => ({
    type: LOGIN_TYPES.setValidResponseCode,
    payload: responseCode
});

export const setLoginSuccess = () => ({
    type: LOGIN_TYPES.setLoginSuccess
})

export const setLoginFailure = error => ({
    type: LOGIN_TYPES.setLoginFailure,
    payload: error
})
