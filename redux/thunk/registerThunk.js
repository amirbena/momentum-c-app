import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerUser } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { registerInvalidResponse, setRegisterValidResponse } from "../reducers/registerReducer";
import { setAccessToken, setLoginResult } from "../reducers/tokenReducer";
import { ACCESS_TOKEN_KEY } from "../../constants";

export const userRegisterThunk = userRegister => async (dispatch, getState) => {
    try {
        const { accessToken, isAdmin, isRegularUser } = await registerUser(userRegister);
        dispatch(setIsLoading(true));
        dispatch(setLoginResult({ accessToken, isAdmin, isRegularUser }));
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        dispatch(setIsLoading(false));
        dispatch(setRegisterValidResponse())
        return accessToken;
    } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(registerInvalidResponse(error))
    }
}