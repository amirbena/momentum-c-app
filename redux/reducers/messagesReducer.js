import { initialState } from "../initialState";


export const MESSAGES_TYPES = {
    addNewNotificationToMessagesHistory: 'messages/addNewNotificationToMessagesHistory',
    removeItemFromPopupNotifications: 'messages/removeItemFromPopupNotifications',
    removeFirstElementFromPopupNotifications: 'messages/removeFirstElementFromPopupNotifications',
    setIsMessagingPopupOpen: 'messages/setIsMessagingPopupOpen',
    setSelectedItemToPopup: 'messages/setSelectedItemToPopup',
    setSelectedPopupQueueOpen: 'messages/setSelectedPopupQueueOpen',
    closeNotificationPopup: 'messages/closeNotificationPopup',
    selectItemToMessagingPopup: 'messages/selectItemToMessagingPopup',
    setMessagesHistory: 'messages/setMessagesHistory',
    setPopupNotifications: 'messages/popupNotifications'
}


export const messagesReducer = (state = initialState.messages, action) => {
    switch (action.type) {
        case MESSAGES_TYPES.addNewNotificationToMessagesHistory:
            return {
                ...state,
                messagesHistory: [action.payload, ...state.messagesHistory],
            };

        case MESSAGES_TYPES.removeItemFromPopupNotifications:
            const item = action.payload;
            return {
                ...state,
                popupNotifications: state.popupNotifications.filter((popupNotification) => popupNotification._id !== item._id),

            };

        case MESSAGES_TYPES.removeFirstElementFromPopupNotifications:
            const [first, ...rest] = state.popupNotifications;
            return {
                ...state,
                popupNotifications: rest

            };
        case MESSAGES_TYPES.setIsMessagingPopupOpen: {
            return {
                ...state,
                isMessagingPopupOpen: action.payload,
                selectedItemToPopup: { _id: "", title: "", description: "", link: "", creationDate: null, scheudlingDate: null, userReadIds: [] }
            }
        }

        case MESSAGES_TYPES.setSelectedItemToPopup: {
            return {
                ...state,
                selectedItemToPopup: { ...action.payload }
            }
        }

        case MESSAGES_TYPES.setSelectedPopupQueueOpen: {
            return {
                ...state,
                isPopupQueueOpen: action.payload,
                selectedItemToPopup: { _id: "", title: "", description: "", link: "", creationDate: null, scheudlingDate: null, userReadIds: [] }
            }
        }

        case MESSAGES_TYPES.closeNotificationPopup: {
            const [first, ...rest] = state.popupNotifications;
            return {
                ...state,
                isPopupQueueOpen: first !== undefined,
                messagesHistory: first ? [state.selectedItemToPopup, ...state.messagesHistory] : state.messagesHistory,
                selectedItemToPopup: first ? { ...first } : initialState.messages.selectedItemToPopup,
                popupNotifications: rest
            }
        }

        case MESSAGES_TYPES.selectItemToMessagingPopup: {
            const _id = action.payload;
            const selectedItem = state.messagesHistory.find(message => message._id === _id);
            if (selectedItem) {
                return {
                    ...state,
                    selectedItemToPopup: selectedItem,
                    isMessagingPopupOpen: false
                }
            }
            return {
                ...state,
                isMessagingPopupOpen: false
            }
        }

        case MESSAGES_TYPES.setMessagesHistory: {
            return {
                ...state,
                messagesHistory: action.payload
            }
        }

        case MESSAGES_TYPES.setPopupNotifications: {
            const results = action.payload;
            const [first, ...rest] = results;
            if (first !== undefined) {
                return {
                    ...state,
                    popupNotifications: rest,
                    isPopupQueueOpen: true,
                    selectedItemToPopup: { ...first }
                }
            }
            else {
                return {
                    ...state,
                    popupNotifications: results,
                }
            }
        }

        default:
            return state;
    }
};

export const addNewNotificationToMessagesHistory = message => ({
    type: MESSAGES_TYPES.addNewNotificationToMessagesHistory,
    payload: message
})

export const removeItemFromPopupNotifications = message => ({
    type: MESSAGES_TYPES.removeItemFromPopupNotifications,
    payload: message
})

export const removeFirstElementFromPopupNotifications = () => ({
    type: MESSAGES_TYPES.removeFirstElementFromPopupNotifications
})

export const setIsMessagingPopupOpen = isMessagingPopupOpen => ({
    type: MESSAGES_TYPES.setIsMessagingPopupOpen,
    payload: isMessagingPopupOpen
})

export const setSelectedItemToPopup = message => ({
    type: MESSAGES_TYPES.setSelectedItemToPopup,
    payload: message
})

export const setSelectedPopupQueueOpen = selectedPopupQueueOpen => ({
    type: MESSAGES_TYPES.setSelectedPopupQueueOpen,
    payload: selectedPopupQueueOpen
})

export const closeNotificationPopup = () => ({
    type: MESSAGES_TYPES.closeNotificationPopup
})

export const selectItemToMessagingPopup = (id) => ({
    type: MESSAGES_TYPES.selectItemToMessagingPopup,
    payload: id

})

export const setMessagesHistory = messages => ({
    type: MESSAGES_TYPES.setMessagesHistory,
    payload: messages
})

export const setPopupNotifications = notifications => ({
    type: MESSAGES_TYPES.setPopupNotifications,
    payload: notifications
})
