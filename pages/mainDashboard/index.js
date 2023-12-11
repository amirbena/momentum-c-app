import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { ImageBackground, Linking, StyleSheet, TouchableOpacityComponent, View, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from '../../utils';
import { MATAN_GUY_LINK, Routes } from '../../constants';
import TotalBought from '../../components/totalBought';
import ProductSells from '../../components/productSells';
import NewProducts from '../../components/newProducts';
import MessagingInbox from '../../components/messagingInbox';
import PopupMessages from '../../components/popupMessages';
import { RealTimePopupUpdates } from '../../components/realtimePopupUpdates/realtimePopupUpdates';
import { defineUserThunk, tokenThunkLogout } from '../../redux/thunk/tokenThunk';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { setIsLoading } from '../../redux/reducers/isLoadingReducer';
import { setIsOpen } from '../../redux/reducers/menuReducer';
import { Text } from 'react-native-elements';
import { logoutUser } from '../../network';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderText from './headerText';

import { getMessages, getPopupMessages } from '../../redux/thunk/messagesThunk';
import { sellsThunk } from '../../redux/thunk/sellsThunk';
import { setFailureAuth } from '../../redux/reducers/noAuthPopupReducer';
import NavigationPanel from '../../components/navigationPanel';


const MainDashboard = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { selectedMobileSelection, isOpen } = useSelector(state => state.menu);
    const { accessToken: stateToken } = useSelector(state => state.token);
    const { fullName } = useSelector(state => state.sells);
    const [localAccessToken, setLocalAccessToken] = useState("");
    const { failureAuth } = useSelector(state => state.noAuthPopup);



    useEffect(() => {
        const bringAllItems = async () => {
            const accessToken = await getAccessToken(stateToken);
            setLocalAccessToken(accessToken);
            await dispatch(defineUserThunk(accessToken));
            await dispatch(getMessages(accessToken));
            await dispatch(getPopupMessages(accessToken));
            await dispatch(sellsThunk(accessToken))
            if (failureAuth) {
                dispatch(setFailureAuth(false));
                dispatch(setActiveScreen(Routes.ENTRANCE));
            }
            dispatch(setIsLoading(false));
        }
        bringAllItems();
        dispatch(setIsLoading(false));
        return () => { }

    }, [])


    const MainComponent = () => (
        <>
            <TotalBought />
            <ProductSells />
        </>
    );


    return (
        <ImageBackground source={require('../../images/mainDashboardBackground.png')} style={styles.mainDashboardHeader}>
            <View style={styles.mobileChecking}>
                <HeaderText />
                <View>
                    {selectedMobileSelection === t('menu.main') ? <MainComponent /> : <></>}
                    {selectedMobileSelection === t('menu.newProducts') ? <NewProducts /> : <></>}
                    {selectedMobileSelection === t('menu.messaging') ? <MessagingInbox /> : <></>}
                </View>

            </View>

        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    mainDashboardHeader: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -30,
        flexShrink: 0,
        height: 1080,
        paddingBottom: 20
    },
    mobileChecking: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    whatsAppIconPosition: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 90,
        height: 90,
        flexShrink: 0,
    },
    whatsAppPositionMenuOpen: {
        position: 'absolute',
        bottom: 40,
        right: 20,
        width: 90,
        height: 90,
        flexShrink: 0,
    },
});

export default MainDashboard;