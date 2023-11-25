import { combineReducers } from "redux";
import { forgotPasswordReducer } from "./forgotPasswordReducer";
import { isLoadingReducer } from "./isLoadingReducer";
import { managementReducer } from "./managementReducer";
import { menuReducer } from "./menuReducer";
import { messagesReducer } from "./messagesReducer";
import { popupReducer } from "./popupReducer";
import { registerReducer } from "./registerReducer";
import { tokenReducer } from "./tokenReducer";
import { videosReducer } from "./videosReducer";
import { resetPasswordReducer } from "./resetPasswordReducer";
import { loginReducer } from "./loginReducer";
import { sellsReducer } from "./sellsReducer";
import { noAuthPopupReducer } from "./noAuthPopupReducer";
import { activeScreenReducer } from "./activeScreenReducer";

export const mainReducer = combineReducers({
    forgotPassword: forgotPasswordReducer,
    isLoading: isLoadingReducer,
    login: loginReducer,
    management: managementReducer,
    menu: menuReducer,
    messages: messagesReducer,
    sells: sellsReducer,
    popup: popupReducer,
    register: registerReducer,
    resetPassword: resetPasswordReducer,
    token: tokenReducer,
    videos: videosReducer,
    noAuthPopup: noAuthPopupReducer,
    activeScreen: activeScreenReducer

})