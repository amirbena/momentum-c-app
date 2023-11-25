import { HttpStatusCode } from "axios";
import { sellsRequest } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { setFailureAuth, setNoAuthPopupOpen } from "../reducers/noAuthPopupReducer";
import { setSells } from "../reducers/sellsReducer";


export const sellsThunk = accessToken => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true))
        const result = await sellsRequest(accessToken);
        dispatch(setSells(result));
        return result;
    } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            return;
        }
        dispatch(setSells({
            creationDate: new Date(),
            fullName: "",
            newProducts: [],
            sellsToday: [],
            totalSells: 0
        }));
    }

}


