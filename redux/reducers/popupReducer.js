import { initialState } from "../initialState";


export const POPUP_TYPES = {
    setPopupOpen: 'popup/setPopupOpen'
}

export const popupReducer = (state = initialState.popup, action) => {
    switch (action.type) {
        case POPUP_TYPES.setPopupOpen:
            return {
                ...state,
                popupOpen: action.payload
            };

        default:
            return state;
    }
};


export const setPopupOpen = popupOpen => ({
    type: POPUP_TYPES.setPopupOpen,
    payload: popupOpen
})