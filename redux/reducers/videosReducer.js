import { HttpStatusCode } from "axios";
import { initialState } from "../initialState"

export const VIDEOS_TYPES = {
    setVideos: 'videos/setVideos',
    setCurrentVideo: 'videos/setCurrentVideo',
    changeVideoSection: 'videos/changeVideoSection',
    setSelectedIndex: 'videos/setSelectedIndex',
    successVideo: 'videos/successVideo',
    failureVideo: 'videos/failureVideo'
}


export const videosReducer = (state = initialState.videos, action) => {
    switch (action.type) {
        case VIDEOS_TYPES.setVideos: {
            const { videos } = action.payload;
            return {
                ...state,
                videos
            }
        }
        case VIDEOS_TYPES.setCurrentVideo: {
            const video = action.payload;
            return {
                ...state,
                currentVideo: video
            };
        }
        case VIDEOS_TYPES.changeVideoSection: {
            const videoSection = action.payload;
            return {
                ...state,
                videoSection
            };
        };

        case VIDEOS_TYPES.setSelectedIndex: {
            const selectedIndex = action.payload;
            return {
                ...state,
                selectedIndex
            };
        }

        case VIDEOS_TYPES.successVideo: {
            const videos = action.payload;
            return {
                ...state,
                videos,
                currentVideo: videos[0] ? videos[0] : initialState.videos.currentVideo,
                selectedIndex: 0,
                responseCode: HttpStatusCode.Ok
            }
        }

        case VIDEOS_TYPES.failureVideo: {
            const { payload: { message } } = action;
            const messageParts = message.split(" ");
            const lastPart = messageParts[messageParts.length - 1]
            return {
                ...state,
                responseCode: lastPart ? parseInt(lastPart) : HttpStatusCode.InternalServerError
            }
        }


        default: {
            return state;
        }
    }
}

export const setVideos = videos => ({
    type: VIDEOS_TYPES.setVideos,
    payload: videos
})

export const setCurrentVideo = currentVideo => ({
    type: VIDEOS_TYPES.setCurrentVideo,
    payload: currentVideo
})

export const changeVideoSection = videoSection => ({
    type: VIDEOS_TYPES.changeVideoSection,
    payload: videoSection
})

export const setSelectedIndex = selectedIndex => ({
    type: VIDEOS_TYPES.setSelectedIndex,
    payload: selectedIndex
})

export const successVideo = (videos) => ({
    type: VIDEOS_TYPES.successVideo,
    payload: videos
})

export const failureVideo = error => ({
    type: VIDEOS_TYPES.failureVideo,
    payload: error
})

