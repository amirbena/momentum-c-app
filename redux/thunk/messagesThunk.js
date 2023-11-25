import { HttpStatusCode } from "axios";
import { getAllPopupsToShowUser, showAllUserHistoryRequest } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { setMessagesHistory, setPopupNotifications } from "../reducers/messagesReducer";
import { logout } from "../reducers/tokenReducer";
import { setFailureAuth, setNoAuthPopupOpen } from "../reducers/noAuthPopupReducer";


export const getMessages = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const result = await showAllUserHistoryRequest(accessToken);
        dispatch(setMessagesHistory(result));
        return result;
    } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsLoading(false));
            return;
        }
        dispatch(setIsLoading(false));
        dispatch(setMessagesHistory([]));
        return [];
    }
}


export const getPopupMessages = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const result = await getAllPopupsToShowUser(accessToken);
        dispatch(setIsLoading(false));
        dispatch(setPopupNotifications(result))
        return result;
    } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsLoading(false));
            return;
        }
        dispatch(setIsLoading(false));
        dispatch(setPopupNotifications([]));
        return [];
    }
}