import { HttpStatusCode } from "axios";
import { filterUsers, sortUserBySelectedValue } from "../../utils/sliceHelper";
import { initialState } from "../initialState"

export const MANAGEMENT_TYPES = {
    setUsers: '/management/setUsers',
    setFilteredUsers: '/management/setFilteredUsers',
    setSelectedValueToSort: '/management/setSelectedValueToSort',
    setSearchedValue: '/management/setSearchedValue',
    setSelectedId: '/management/setSelectedId',
    setPopupScheduling: '/management/setPopupScheduling',
    setPopupCreation: '/management/setPopupCreation',
    setVideoUpload: '/management/setVideoUpload',
    setPopupDelete: '/management/setPopupDelete',
    setItemPopupDelete: '/management/setItemPopupDelete',
    setVideoUploadState: '/management/setVideoUploadState',
    changeBadgeVideo: '/management/changeBadgeVideo',
    setPopupCreationState: '/management/setPopupCreationState',
    changeBadgePopupCreation: '/management/changeBadgePopupCreation',
    setPopupSchedualingState: '/management/setPopupSchedualingState',
    changeBadgeSchedualingCreation: '/management/ changeBadgeSchedualingCreation',
    fetchUsersFromManagementSucceed: '/management/fetchUsersFromManagementSucceed',
    fetchUsersFromManagementFailure: '/management/fetchUsersFromManagementFailure',
    setAccesssLayerOfUserSucceed: '/management/setAccesssLayerOfUserSucceed',
    deleteRegularUserSucceed: '/management/deleteUserSucceed',
    initVideoUploadState: '/management/initVideoUploadState',
    initPopupCreation: '/manangement/popupCreation',
    initPopupSchedualing: '/management/initPopupSchedualing'
}

export const managementReducer = (state = initialState.management, action) => {
    switch (action.type) {
        case MANAGEMENT_TYPES.setUsers: {
            return {
                ...state,
                users: action.payload
            }
        }
        case MANAGEMENT_TYPES.setFilteredUsers: {
            return {
                ...state,
                filteredUsers: action.payload
            }
        }
        case MANAGEMENT_TYPES.setSelectedId: {
            return {
                ...state,
                selectedId: action.payload
            }
        }
        case MANAGEMENT_TYPES.setSelectedValueToSort: {
            const { t, selectedValueToSort } = action.payload;
            state.selectedValueToSort = selectedValueToSort;
            return {
                ...state,
                filteredUsers: sortUserBySelectedValue(state.searchedValue ? state.filteredUsers : state.users, selectedValueToSort, t)
            }
        }
        case MANAGEMENT_TYPES.setSearchedValue: {
            const { searchedValue, t } = action.payload;
            return {
                ...state,
                searchedValue,
                filteredUsers: filterUsers(state.users, state.selectedValueToSort, searchedValue, t)
            }
        }

        case MANAGEMENT_TYPES.setPopupCreationState: {
            const { id, value } = action.payload;
            return {
                ...state,
                popupCreationState: {
                    ...state.popupCreationState,
                    [id]: value
                }
            }
        }

        case MANAGEMENT_TYPES.setPopupScheduling: {
            return {
                ...state,
                popupScheduling: action.payload
            }
        }

        case MANAGEMENT_TYPES.setPopupCreation: {
            return {
                ...state,
                popupCreation: action.payload
            }
        }

        case MANAGEMENT_TYPES.setVideoUpload: {
            return {
                ...state,
                videoUpload: action.payload
            }
        }

        case MANAGEMENT_TYPES.setPopupDelete: {
            return {
                ...state,
                popupDelete: action.payload
            }
        }


        case MANAGEMENT_TYPES.changeBadgePopupCreation: {
            return {
                ...state,
                popupCreationState: {
                    ...state.popupCreationState,
                    userType: action.payload
                }
            }
        }

        case MANAGEMENT_TYPES.setItemPopupDelete: {
            const { destPopup, selectedId } = action.payload;
            return {
                ...state,
                popupDelete: destPopup,
                selectedId: selectedId
            }
        }

        case MANAGEMENT_TYPES.setVideoUploadState: {
            const { id, value } = action.payload;
            return {
                ...state,
                videoUploadState: {
                    ...state.videoUploadState,
                    [id]: value
                }
            }
        }
        case MANAGEMENT_TYPES.changeBadgeVideo: {
            return {
                ...state,
                videoUploadState: {
                    ...state.videoUploadState,
                    userType: action.payload
                }
            }
        }
        case MANAGEMENT_TYPES.setPopupSchedualingState: {
            const { id, value } = action.payload;
            return {
                ...state,
                popupSchedulingState: {
                    ...state.popupSchedulingState,
                    [id]: value
                }

            }
        }

        case MANAGEMENT_TYPES.changeBadgeSchedualingCreation: {
            return {
                ...state,
                popupSchedulingState: {
                    ...state.popupSchedulingState,
                    userType: action.payload
                }
            }
        }

        case MANAGEMENT_TYPES.fetchUsersFromManagementSucceed: {
            return {
                ...state,
                users: action.payload,
                filteredUsers: action.payload
            }
        }

        case MANAGEMENT_TYPES.fetchUsersFromManagementFailure: {
            const { payload: { message } } = action;
            const messageParts = message.split(" ");
            const lastPart = messageParts[messageParts.length - 1]
            return {
                ...state,
                usersToManagementBoardStatus: lastPart ? parseInt(lastPart) : HttpStatusCode.InternalServerError
            }
        }

        case MANAGEMENT_TYPES.setAccesssLayerOfUserSucceed: {
            const index = state.users.findIndex(user => user._id === state.selectedId);
            const userToChange = { ...state.users[index], accessLayer: action.payload.accessLayer };

            const indexForFilter = state.filteredUsers.findIndex(user => user._id === state.selectedId);
            const userToChangeFilter = { ...state.users[index], accessLayer: action.payload.accessLayer };


            return {
                ...state,
                users: [...state.users.slice(0, index), userToChange, ...state.users.slice(index + 1)],
                filteredUsers: [...state.users.slice(0, indexForFilter), userToChangeFilter, ...state.users.slice(indexForFilter + 1)]
            }
        }

        case MANAGEMENT_TYPES.deleteRegularUserSucceed: {
            const users = state.users.filter(user => user._id !== state.selectedId);
            return {
                ...state,
                users,
                filteredUsers: users,
                selectedId: ''
            }
        }

        case MANAGEMENT_TYPES.initVideoUploadState: {
            return {
                ...state,
                videoUpload: false,
                ...initialState.management.videoUploadState
            }
        }

        case MANAGEMENT_TYPES.initPopupCreation: {
            return {
                ...state,
                popupCreation: false,
                popupCreationState: {
                    ...initialState.management.popupCreationState
                }
            }
        }

        case MANAGEMENT_TYPES.initPopupSchedualing: {
            return {
                ...state,
                popupScheduling: false,
                popupSchedulingState: {
                    ...initialState.management.popupSchedulingState
                }
            }
        }

        default: {
            return state;
        }
    }
};


export const setUsers = users => ({
    type: MANAGEMENT_TYPES.setUsers,
    payload: users
})


export const setFilteredUsers = filteredUsers => ({
    type: MANAGEMENT_TYPES.setFilteredUsers,
    payload: filteredUsers
});


export const setSelectedValueToSort = payload => ({
    type: MANAGEMENT_TYPES.setSelectedValueToSort,
    payload
});

export const setSearchedValue = ({ searchedValue, t }) => ({
    type: MANAGEMENT_TYPES.setSearchedValue,
    payload: { searchedValue, t }
})

export const setPopupScheduling = (popupScheduling) => ({
    type: MANAGEMENT_TYPES.setPopupScheduling,
    payload: popupScheduling
});

export const setPopupCreation = (popupCreation) => ({
    type: MANAGEMENT_TYPES.setPopupCreation,
    payload: popupCreation
});

export const setVideoUpload = (videoUpload) => ({
    type: MANAGEMENT_TYPES.setVideoUpload,
    payload: videoUpload
})

export const setPopupDelete = (popupDelete) => ({
    type: MANAGEMENT_TYPES.setPopupDelete,
    payload: popupDelete
})

export const setItemPopupDelete = (itemPopupDelete) => ({
    type: MANAGEMENT_TYPES.setItemPopupDelete,
    payload: itemPopupDelete
})

export const setVideoUploadState = videoUploadItem => ({
    type: MANAGEMENT_TYPES.setVideoUploadState,
    payload: videoUploadItem
})

export const changeBadgeVideo = userType => ({
    type: MANAGEMENT_TYPES.changeBadgeVideo,
    payload: userType
});


export const setPopupSchedualingState = popupSchedualingItem => ({
    type: MANAGEMENT_TYPES.setPopupSchedualingState,
    payload: popupSchedualingItem
});

export const changeBadgeSchedualingCreation = userType => ({
    type: MANAGEMENT_TYPES.changeBadgeSchedualingCreation,
    payload: userType
})

export const fetchUsersFromManagementSucceed = users => ({
    type: MANAGEMENT_TYPES.fetchUsersFromManagementSucceed,
    payload: users
});

export const fetchUsersFromManagementFailure = error => ({
    type: MANAGEMENT_TYPES.fetchUsersFromManagementFailure,
    payload: error
})

export const setSelectedId = id => ({
    type: MANAGEMENT_TYPES.setSelectedId,
    payload: id
})

export const setAccesssLayerOfUserSucceed = userUpdated => ({
    type: MANAGEMENT_TYPES.setAccesssLayerOfUserSucceed,
    payload: userUpdated
})

export const deleteUserSucceed = () => ({
    type: MANAGEMENT_TYPES.deleteRegularUserSucceed
})

export const initVideoUploadState = () => ({
    type: MANAGEMENT_TYPES.initVideoUploadState
})

export const initPopupCreation = () => ({
    type: MANAGEMENT_TYPES.initPopupCreation
})

export const initPopupSchedualing = () => ({
    type: MANAGEMENT_TYPES.initPopupSchedualing
})

export const setPopupCreationState = item => ({
    type: MANAGEMENT_TYPES.setPopupCreationState,
    payload: item
})

export const changeBadgePopupCreation = userType => ({
    type: MANAGEMENT_TYPES.changeBadgePopupCreation,
    payload: userType
})