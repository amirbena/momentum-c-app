import { HttpStatusCode } from "axios";
import { initialState } from "../initialState"

export const REGISTER_TYPES = {
    setFormItem: 'register/setFormItem',
    setValidResponse: 'register/setValidResponse',
    setCheckboxItem: 'register/setCheckboxItem',
    initRegisterData: 'register/initRegisterData',
    setShowError: 'register/setShowError',
    setValidResponseCode: 'register/setValidResponseCode',
    registerValidResponse: 'register/validResponse',
    registerInvalidResponse: 'register/invalidResponse'
}

export const registerReducer = (state = initialState.register, action) => {
    switch (action.type) {
        case REGISTER_TYPES.setFormItem: {
            const [key, value] = action.payload;
            return {
                ...state,
                [key]: value
            }
        }
        case REGISTER_TYPES.setCheckboxItem: {
            const [checkboxKey, checkboxValue] = action.payload;
            return {
                ...state,
                [checkboxKey]: checkboxValue
            }
        }
        case REGISTER_TYPES.initRegisterData: {
            return {
                ...initialState.register
            }
        }

        case REGISTER_TYPES.setShowError: {
            return {
                ...state,
                showError: action.payload
            }
        }
        case REGISTER_TYPES.setValidResponseCode: {
            return {
                ...state,
                validResponseCode: action.payload
            }
        }

        case REGISTER_TYPES.setValidResponse: {
            return {
                ...state,
                validResponse: true,
                showError: true
            }
        }

        case REGISTER_TYPES.registerInvalidResponse: {
            const { payload: { message } } = action;
            let validResponse = null;
            const messageParts = message.split(" ");
            if (messageParts[messageParts.length - 1] === HttpStatusCode.Conflict.toString()) {
                validResponse = false;
            }
            return {
                ...state,
                showError: true,
                validResponse: validResponse !== null ? validResponse : state.validResponse
            }
        }

        default: {
            return state;
        }
    }
}

export const setFormItem = itemKeyValue => ({
    type: REGISTER_TYPES.setFormItem,
    payload: itemKeyValue
})

export const setRegisterValidResponse = registerValidResponse => ({
    type: REGISTER_TYPES.setValidResponse,
    payload: registerValidResponse
})

export const setCheckboxItem = checkboxItem => ({
    type: REGISTER_TYPES.setCheckboxItem,
    payload: checkboxItem
})

export const initRegisterData = () => ({
    type: REGISTER_TYPES.initRegisterData
})

export const setRegisterShowError = showError => ({
    type: REGISTER_TYPES.setShowError,
    payload: showError
});

export const setRegisterValidResponseCode = validResponseCode => ({
    type: REGISTER_TYPES.setValidResponseCode,
    payload: validResponseCode
})

export const setValidResponse = () => ({
    type: REGISTER_TYPES.setValidResponse
})

export const registerInvalidResponse = error => ({
    type: REGISTER_TYPES.registerInvalidResponse,
    payload: error
})

