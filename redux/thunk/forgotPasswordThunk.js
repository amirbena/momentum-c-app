import { HttpStatusCode } from "axios";
import { forgotPasswordRequest } from "../../network";
import { setEmailSent, setForgotPasswordFailureResponseCode, setForgotPasswordValidCode } from "../reducers/forgotPasswordReducer";
import { setIsLoading } from "../reducers/isLoadingReducer";

export const forgotPasswordThunk = forgotPasswordDto => async (dispatch, getState) => {
    try {
        const result = await forgotPasswordRequest(forgotPasswordDto);
        dispatch(setEmailSent(result));
        dispatch(setForgotPasswordValidCode(HttpStatusCode.Ok));
        return result;
    } catch (error) {
        dispatch(setIsLoading(false));
        dispatch(setForgotPasswordFailureResponseCode(error));
    }
};
