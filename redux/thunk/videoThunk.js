import { HttpStatusCode } from "axios";
import { getVideosBySection } from "../../network";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { logout } from "../reducers/tokenReducer";
import { failureVideo, successVideo } from "../reducers/videosReducer";
import { setIsOpen } from "../reducers/menuReducer";
import { setFailureAuth, setNoAuthPopupOpen } from "../reducers/noAuthPopupReducer";


export const videosByAccessLayerThunk = (accessToken) => async (dispatch, getState) => {
    try {
        dispatch(setIsLoading(true));
        const { videos: { videoSection } } = getState();
        const videos = await getVideosBySection(accessToken, videoSection);
        dispatch(setIsLoading(false));
        dispatch(successVideo(videos));
        return videos;
    } catch (error) {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setFailureAuth(true))
            return;
        }
        dispatch(setIsLoading(false));
        dispatch(failureVideo(error));
    }
}
