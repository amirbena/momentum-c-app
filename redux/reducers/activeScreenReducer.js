import { initialState } from "../initialState";

const ACTIVE_SCREEN_TYPES = {
    setActiveScreen: '/activeScreen/SetActiveScreen',
}

export const activeScreenReducer = (state = initialState.activeScreen, action) => {
    switch (action.type) {
        case ACTIVE_SCREEN_TYPES.setActiveScreen: {
              return {
                ...state,
                index: action.payload
              }
        }

        default: {
            return state;
        }
    }
}

export const setActiveScreen = index =>({
    type: ACTIVE_SCREEN_TYPES.setActiveScreen,
    payload: index
})