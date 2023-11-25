import { initialState } from "../initialState";


export const MENU_TYPES = {
    setIsOpen: 'menu/setIsOpen',
    setSelectedMobileSelection: 'menu/setSelectedMobileSelection'
}

export const menuReducer = (state = initialState.menu, action) => {
    switch (action.type) {
        case MENU_TYPES.setIsOpen:
            return {
                ...state,
                isOpen: action.payload,
            };

        case MENU_TYPES.setSelectedMobileSelection:
            return {
                ...state,
                selectedMobileSelection: action.payload,
            };

        default:
            return state;
    }
};

export const setIsOpen = isOpen => ({
    type: MENU_TYPES.setIsOpen,
    payload: isOpen
})

export const setSelectedMobileSelection = selectedMobileSelection => ({
    type: MENU_TYPES.setSelectedMobileSelection,
    payload: selectedMobileSelection
})