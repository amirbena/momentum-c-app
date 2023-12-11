import { HttpStatusCode } from "axios";
import { defineUser, isSamePassword } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { logout, setIsSamePassword, setUserType } from "../reducers/tokenReducer";
import { setFailureAuth, setNoAuthPopupOpen } from "../reducers/noAuthPopupReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const defineUserThunk = accessToken => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const { isAdmin, isRegularUser } = await defineUser(accessToken);
        dispatch(setUserType({ isAdmin, isRegularUser }))
        return { isAdmin, isRegularUser };
    } catch (error) {
        dispatch(setIsLoading(false));
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            return;
        }
        dispatch(setUserType({ isAdmin: false, isRegularUser: false }))
    }

}

export const isSamePasswordThunk = (password, accessToken) => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const result = await isSamePassword(accessToken, password);
        dispatch(setIsLoading(false));
        dispatch(setIsSamePassword(result))
        return result;
    } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            return;
        }
        dispatch(setIsLoading(false));
        dispatch(setIsSamePassword(false));
    }
}

export const tokenThunkLogout = () => async (dispatch, getState) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        await AsyncStorage.setItem(IS_ADMIN_KEY, isAdmin);
        await AsyncStorage.setItem(IS_EMPLOYEE_KEY, isEmployee);
        dispatch(logout());
    } catch (error) {

    }
}
