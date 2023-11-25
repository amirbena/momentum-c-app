import { HttpStatusCode } from "axios";
import { ACCESS_TOKEN_KEY, VIDEOS_SECTIONS, VIDEO_ACCESS_LAYERS } from "../../constants";
import { getUsersToManagementBoard, updateUser, deleteUser as deleteUserRequest, deleteUserForever as deleteUserForeverRequest, createVideoRequest, createRegularPopupRequest, createSchedualingPopupRequest } from "../../network";
import { changeCustomerTypeToAccessLayer, convertHourAndDateToDateObject, getAccessToken } from "../../utils";
import { setIsLoading } from "../reducers/isLoadingReducer";
import { deleteUserSucceed, fetchUsersFromManagementFailure, fetchUsersFromManagementSucceed, setAccesssLayerOfUserSucceed, setPopupDelete, setSelectedId, initVideoUploadState, initPopupCreation, initPopupSchedualing } from "../reducers/managementReducer";
import { setIsOpen } from "../reducers/menuReducer";
import { setFailureAuth, setNoAuthPopupOpen } from "../reducers/noAuthPopupReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const fetchUsersFromManagement = (accessToken) => async (dispatch, getState) => {
    try {
        const result = await getUsersToManagementBoard(accessToken);
        dispatch(fetchUsersFromManagementSucceed(result));
        return result;
    } catch (error) {
        //setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
        dispatch(fetchUsersFromManagementFailure(error));
    }
};


export const setAccesssLayerOfUser = ({ dropDownName, id, t }, accessToken) => async (dispatch, getState) => {
    try {
        const accessLayer = changeCustomerTypeToAccessLayer(t, dropDownName);
        dispatch(setSelectedId(id));
        dispatch(setIsLoading(true));
        const result = await updateUser(accessToken, id, { accessLayer });
        dispatch(setIsLoading(false));
        dispatch(setAccesssLayerOfUserSucceed(result));
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
    }
};


export const deleteRegularUser = (accessToken) => async (dispatch, getState) => {
    try {
        const { management: { selectedId } } = getState();
        dispatch(setIsLoading(true));
        const result = await deleteUserRequest(accessToken, selectedId);
        dispatch(setIsLoading(false));
        dispatch(deleteUserSucceed());
        dispatch(setPopupDelete(false));
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
    }

}

export const deleteForeverUser = (accessToken) => async (dispatch, getState) => {
    try {
        const { management: { selectedId } } = getState();
        dispatch(setIsLoading(true));
        const result = await deleteUserForeverRequest(accessToken, selectedId);
        dispatch(setIsLoading(false));
        dispatch(deleteUserSucceed());
        dispatch(setPopupDelete(false));
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
    }

}


export const createVideoThunk = (accessToken) => async (dispatch, getState) => {
    const { management: { videoUploadState: { userType, ...rest } } } = getState();

    const mapVideoToRequest = {
        [VIDEO_ACCESS_LAYERS.FREE]: [VIDEO_ACCESS_LAYERS.FREE],
        [VIDEO_ACCESS_LAYERS.PREMIUM]: [VIDEO_ACCESS_LAYERS.PREMIUM],
        [VIDEO_ACCESS_LAYERS.ALL]: [VIDEO_ACCESS_LAYERS.FREE, VIDEO_ACCESS_LAYERS.PREMIUM]
    }

    try {
        const video = { ...rest, accessLayers: mapVideoToRequest[userType], section: VIDEOS_SECTIONS.GENERAL };
        dispatch(setIsLoading(true));
        const result = await createVideoRequest(accessToken, video);
        dispatch(setIsLoading(false));
        dispatch(initVideoUploadState())
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
    }



}


export const popupRequest = () => async (dispatch, getState) => {
    try {
        const { token: { accessToken: tokenAccessToken }, management: { popupCreationState: { userType, fileUpload: link, ...rest } } } = getState();

        const accessToken = await getAccessToken(tokenAccessToken);
        const mapVideoToRequest = {
            [VIDEO_ACCESS_LAYERS.FREE]: [VIDEO_ACCESS_LAYERS.FREE],
            [VIDEO_ACCESS_LAYERS.PREMIUM]: [VIDEO_ACCESS_LAYERS.PREMIUM],
            [VIDEO_ACCESS_LAYERS.ALL]: [VIDEO_ACCESS_LAYERS.FREE, VIDEO_ACCESS_LAYERS.PREMIUM]
        }

        const popup = { ...rest, accessLayers: mapVideoToRequest[userType], link };
        dispatch(setIsLoading(true));
        const result = await createRegularPopupRequest(accessToken, popup);
        dispatch(setIsLoading(false));
        dispatch(initPopupCreation());
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
        throw error;
    }



}

export const popupSchedualingRequest = () => async (dispatch, getState) => {
    try {
        const { token: { accessToken: tokenAccessToken }, management: { popupSchedulingState: { userType, fileUpload: link, hour, date, ...rest } } } = getState();

        const accessToken = await getAccessToken(tokenAccessToken);
        const mapVideoToRequest = {
            [VIDEO_ACCESS_LAYERS.FREE]: [VIDEO_ACCESS_LAYERS.FREE],
            [VIDEO_ACCESS_LAYERS.PREMIUM]: [VIDEO_ACCESS_LAYERS.PREMIUM],
            [VIDEO_ACCESS_LAYERS.ALL]: [VIDEO_ACCESS_LAYERS.FREE, VIDEO_ACCESS_LAYERS.PREMIUM]
        }

        const scheudlingDate = convertHourAndDateToDateObject(date, hour);

        const popup = { ...rest, accessLayers: mapVideoToRequest[userType], link, scheudlingDate };
        dispatch(setIsLoading(true));
        const result = await createSchedualingPopupRequest(accessToken, popup);
        dispatch(setIsLoading(false));
        dispatch(initPopupSchedualing());
        return result;
    } catch (error) {
        setIsLoading(false);
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            dispatch(setNoAuthPopupOpen(true));
            dispatch(setIsOpen(false));
            return;
        }
        throw error;
    }
}
