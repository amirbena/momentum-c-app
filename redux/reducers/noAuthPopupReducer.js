import { initialState } from "../initialState";


export const NO_AUTH_TYPES = {
    setIsOpen: 'noAuthPopup/setIsOpen',
    setFailureAuth: 'noAuthPopup/setFailureAuth'
}

export const noAuthPopupReducer = (state = initialState.noAuthPopup, action) => {
    switch (action.type) {
        case NO_AUTH_TYPES.setIsOpen:
            return {
                ...state,
                isOpen: action.payload,
            };
        case NO_AUTH_TYPES.setFailureAuth:
            return {
                ...state,
                failureAuth: action.payload,
            };


        default:
            return state;
    }
};

export const setNoAuthPopupOpen = isOpen => ({
    type: NO_AUTH_TYPES.setIsOpen,
    payload: isOpen
})

export const setFailureAuth = failureAuth => ({
    type: NO_AUTH_TYPES.setIsOpen,
    payload: failureAuth
})