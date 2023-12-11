import axios from 'axios';
import { VIDEOS_SECTIONS } from '../constants';
import { getOrigin } from '../utils';


const origin = getOrigin();


export const registerUser = async (user) => {
    try {
        const result = await axios.post(`${origin}/users/register`, user);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export const loginUser = async (userLogin) => {
    try {
        const result = await axios.post(`${origin}/users/login`, userLogin);
        return result.data;

    } catch (error) {
        throw error;
    }
}

export const forgotPasswordRequest = async (forgotPasswordContent) => {
    try {
        const result = await axios.put(`${origin}/users/forgot-password`, forgotPasswordContent);
        return result.data;
    } catch (error) {
        throw error;

    }
}

export const resetPassword = async (resetPasswordDto) => {
    try {
        const result = await axios.put(`${origin}/users/reset-password`, resetPasswordDto);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export const defineUser = async accessToken => {
    try {
        const result = await axios.post(`${origin}/users/define-token`, { accessToken });
        return result.data;
    } catch (ex) {
        return {
            isAdmin: false,
            isRegularUser: false
        }
    }
}

export const logoutUser = async accessToken => {
    try {
        const result = await axios.post(`${origin}/users/logout`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        return result.data;
    } catch (ex) {
        return "";
    }
}

export const getVideosBySection = async (accessToken, videoSection = VIDEOS_SECTIONS.GENERAL) => {
    const result = await axios.post(`${origin}/videos/videos-by-access-layer`, { section: videoSection }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}


export const getUsersToManagementBoard = async (accessToken) => {
    const result = await axios.get(`${origin}/users`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}


export const updateUser = async (accessToken, userId, updateUserDto) => {
    try {
        const result = await axios.put(`${origin}/users/update-user`, { id: userId, ...updateUserDto }, { headers: { Authorization: `Bearer ${accessToken}` } });
        return result.data;
    } catch (error) {
        return "";
    }

}

export const updatePopup = async (accessToken, popupId) => {
    try {
        const result = await axios.put(`${origin}/popup`, { popupId }, { headers: { Authorization: `Bearer ${accessToken}` } });
        return result.data;
    } catch (error) {
        return "";
    }

}


export const deleteUser = async (accessToken, id) => {
    const result = await axios.delete(`${origin}/users/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}

export const deleteUserForever = async (accessToken, id) => {
    const result = await axios.delete(`${origin}/users/ban-forver/${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}


export const isSamePassword = async (accessToken, password) => {
    const result = await axios.post(`${origin}/users/is-same-password`, { password }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
};

export const createVideoRequest = async (accessToken, video) => {
    const result = await axios.post(`${origin}/videos`, video, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}

export const createRegularPopupRequest = async (accessToken, popup) => {
    const result = await axios.post(`${origin}/popup/regular`, { ...popup, creationDate: new Date() }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}

export const createSchedualingPopupRequest = async (accessToken, popup) => {
    const result = await axios.post(`${origin}/popup/schedualing`, { ...popup, creationDate: new Date() }, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}


export const getAllPopupsToShowUser = async (accessToken) => {
    try {
        const result = await axios.post(`${origin}/popup`, { dateToCheck: new Date() }, { headers: { Authorization: `Bearer ${accessToken}` } });
        return result.data;
    } catch (error) {
        return [];
    }
}

export const showAllUserHistoryRequest = async (accessToken) => {
    try {
        const result = await axios.post(`${origin}/popup/read-popups`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
        return result.data;
    } catch (error) {
        return [];
    }
}

export const sellsRequest = async (accessToken) => {
    const result = await axios.post(`${origin}/sells`, {}, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result.data;
}