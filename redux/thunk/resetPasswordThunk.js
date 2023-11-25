import { resetPassword as resetPasswordRequest } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { resetPasswordFailureResponseCode, resetPasswordResponseCode, setPasswordSent } from "../reducers/resetPasswordReducer";


export const resetPasswordThunk = resetToken => async (dispatch, getState) => {
    try {
        const { resetPassword: { password } } = getState();
        dispatch(setIsLoading(true))
        const result = await resetPasswordRequest({ password, resetToken });
        dispatch(setIsLoading(false))
        dispatch(setPasswordSent(result));
        dispatch(resetPasswordResponseCode());
        return result;
    } catch (error) {
        dispatch(setIsLoading(false))
        dispatch(resetPasswordFailureResponseCode(error));
    }
}


