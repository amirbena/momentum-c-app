import { initialState } from "../initialState"

export const IS_LOADING_TYPES = {
    setIsLoading: '/isLoading/setIsLoading',
}

export const isLoadingReducer = (state = initialState.isLoading, action) => {
    switch (action.type) {
        case IS_LOADING_TYPES.setIsLoading: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default: {
            return state;
        }
    }
}


export const setIsLoading = (isLoading) => ({
    type: IS_LOADING_TYPES.setIsLoading,
    payload: isLoading
})