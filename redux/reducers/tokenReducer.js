import { ACCESS_TOKEN_KEY, IS_ADMIN_KEY, IS_EMPLOYEE_KEY } from "../../constants";
import { initialState } from "../initialState"

export const TOKEN_TYPES = {
    setAccessToken: '/token/setAccessToken',
    setUserType: '/token/setUserType',
    setIsSamePassword: '/token/isSamePassword',
    setIsAdmin: '/token/setIsAdmin',
    logout: '/token/logout',
    setLoginResult: '/token/setLoginResult',
    setIsEmployee: '/token/setIsEmployee'
}

export const tokenReducer = (state = initialState.token, action) => {
    switch (action.type) {
        case TOKEN_TYPES.setAccessToken: {
            return {
                ...state,
                accessToken: action.payload
            }
        }
        case TOKEN_TYPES.setUserType: {
            const { isRegularUser, isAdmin } = action.payload;
            return {
                ...state,
                isRegularUser,
                isAdmin
            };
        }
        case TOKEN_TYPES.logout: {
            return {
                ...initialState.token
            }
        }

        case TOKEN_TYPES.setIsAdmin: {
            return {
                ...state,
                isAdmin: action.payload
            }
        }

        case TOKEN_TYPES.setIsSamePassword: {
            return {
                ...state,
                isSamePassword: action.payload
            }
        }

        case TOKEN_TYPES.setLoginResult: {
            const { accessToken, isAdmin, isRegularUser, isEmployee, isVisitorUser } = action.payload;
            return {
                ...state,
                accessToken,
                isRegularUser,
                isAdmin,
                isEmployee,
                isVisitorUser
            }
        }


        case TOKEN_TYPES.setIsEmployee:{
            return {
                ...state,
                isEmployee: action.payload
            }
        }


        default: {
            return state;
        }
    }
}

export const setAccessToken = accessToken => ({
    type: TOKEN_TYPES.setAccessToken,
    payload: accessToken
});

export const setUserType = userType => ({
    type: TOKEN_TYPES.setUserType,
    payload: userType
})

export const logout = () => ({
    type: TOKEN_TYPES.logout
})

export const setIsSamePassword = samePassword => ({
    type: TOKEN_TYPES.setIsSamePassword,
    payload: samePassword
})

export const setLoginResult = loginResult => ({
    type: TOKEN_TYPES.setLoginResult,
    payload: loginResult
})

export const setIsAdmin = isAdmin => ({
    type: TOKEN_TYPES.setIsAdmin,
    payload: isAdmin
})

export const setIsEmployee = isEmployee =>({
    type: TOKEN_TYPES.setIsEmployee,
    payload: isEmployee
})