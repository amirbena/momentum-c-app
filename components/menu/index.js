import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './menu.css';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN_KEY, ENGLISH, HEBREW, LANGUAGE_KEY, Routes } from '../../constants';
import mobileMenuSvg from '../../images/mobileMenu.png';
import { isMobile } from 'react-device-detect';
import { setIsOpen, setSelectedMobileSelection } from '../../redux/reducers/menuReducer';
import { logout } from '../../redux/reducers/tokenReducer';
import { setIsLoading } from '../../redux/reducers/isLoadingReducer';
import { logoutUser } from '../../network';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { getAccessToken } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Menu = ({ menuClosedClass = "", menuItemClass = "", menuShowClass = "" }) => {
    const { isOpen } = useSelector(state => state.menu);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const { isAdmin, accessToken: stateToken } = useSelector(state => state.token);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {

        const accessToken = async () => {
            const result = await getAccessToken(stateToken);
            setAccessToken(result)
        }
        accessToken();
        return () => { }
    }, [])





    const handleOpen = () => {
        dispatch(setIsOpen(true));
    }

    const handleLogout = () => {
        logoutUser(accessToken);
        dispatch(logout());
        dispatch(setIsLoading(true));
        dispatch(setIsOpen(false));
        dispatch(setActiveScreen(Routes.ENTRANCE))
    }

    const convertLanguage = async () => {
        const language = i18n.language === HEBREW ? ENGLISH : HEBREW;
        i18n.changeLanguage(language);
        await AsyncStorage.setItem(LANGUAGE_KEY, language);
    }


    const handleVideosSections = () => {
        dispatch(setActiveScreen(Routes.VIDEOS_SECTION))
        dispatch(setIsOpen(false));
    }


    const handleMobileSelection = value => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD))
        dispatch(setSelectedMobileSelection(value));
        dispatch(setIsOpen(false));
    }

}

export default Menu;

