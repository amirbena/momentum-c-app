import { setIsLoading } from "../reducers/isLoadingReducer";
import { loginUser } from "../../network";
import { setLoginResult } from "../reducers/tokenReducer";
import { setLoginFailure, setLoginSuccess } from "../reducers/loginReducer";


export const userLoginThunk = loginUserDto => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const { accessToken, isAdmin, isRegularUser, isEmployee, isVisitorUser } = await loginUser(loginUserDto);
        dispatch(setIsLoading(false));
        dispatch(setLoginResult({ accessToken, isAdmin, isRegularUser, isEmployee, isVisitorUser }));
        dispatch(setLoginSuccess());
        return { accessToken, isAdmin, isRegularUser };
    } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(setLoginFailure(error));
    }
};