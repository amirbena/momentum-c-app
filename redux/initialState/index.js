import { Routes, VIDEOS_SECTIONS } from "../../constants";

export const initialState = {
    forgotPassword: {
        email: "",
        emailSent: false,
        validResponseCode: 0
    },
    isLoading: {
        isLoading: false
    },
    noAuthPopup: {
        isOpen: false,
        failureAuth: false
    },
    sells: {
        fullName: '',
        totalSells: 0,
        sellsToday: [],
        newProducts: []
    },
    login: {
        email: '',
        password: '',
        validResponseCode: 0,
        showError: false
    },
    activeScreen: {
        index: Routes.ENTRANCE,
    },
    management: {
        users: [], selectedValueToSort: '',
        filteredUsers: [],
        selectedId: '', searchedValue: '', popupDelete: false, popupScheduling: false, popupCreation: false, videoUpload: false, usersToManagementBoardStatus: 0,
        videoUploadState: {
            title: '',
            description: '',
            userType: '',
            link: ''
        },
        popupCreationState: {
            title: "",
            userType: "",
            description: "",
            fileUpload: ""
        },
        popupSchedulingState: {
            title: "",
            date: "",
            hour: "",
            description: "",
            userType: "",
            fileUpload: ""
        },

    },
    menu: {
        isOpen: false,
        selectedMobileSelection: 'מוצרים חדשים'
    },
    popup: {
        popupOpen: true
    },
    messages: {
        messagesHistory: [],
        popupNotifications: [],
        isMessagingPopupOpen: false,
        isPopupQueueOpen: false,
        selectedItemToPopup: {
            _id: "", title: "", description: "", link: "", creationDate: null, scheudlingDate: null,
            userReadIds: []
        }
    },
    register: {
        name: '',
        email: '',
        password: '',
        passwordVerification: '',
        phone: '',
        acceptedCondition: false,
        above18: false,
        validResponse: false,
        showError: false
    },
    resetPassword: {
        password: "",
        verifyPassword: "",
        passwordSent: false,
        validResponseCode: 0
    },
    token: {
        accessToken: '',
        isAdmin: false,
        isRegularUser: false,
        isEmployee: false,
        isVisitorUser: false,
        isSamePassword: null
    },
    videos: {
        videos: [],
        currentVideo: { title: '', description: '', link: '', _id: '' },
        selectedIndex: 0,
        videoSection: VIDEOS_SECTIONS.GENERAL,
        responseCode: 0
    }
}