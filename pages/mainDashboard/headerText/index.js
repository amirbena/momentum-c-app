import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacityComponent, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAccessToken } from '../../../utils';
import { tokenThunkLogout } from '../../../redux/thunk/tokenThunk';
import { Routes } from '../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { logoutUser } from '../../../network';
import { setActiveScreen } from '../../../redux/reducers/activeScreenReducer';
import { setIsLoading } from '../../../redux/reducers/isLoadingReducer';
import { setIsOpen } from '../../../redux/reducers/menuReducer';

const HeaderText = () => {
    const { t } = useTranslation();
    const { fullName } = useSelector((state) => state.sells);
    const { accessToken: token } = useSelector(state => state.token);

    const dispatch = useDispatch();

    const handleLogout = async () => {
        const accessToken = await getAccessToken(token);
        logoutUser(accessToken);
        await dispatch(tokenThunkLogout());
        dispatch(setActiveScreen(Routes.ENTRANCE));
        dispatch(setIsLoading(true));
        dispatch(setIsOpen(false));
    }


    return (
        <View style={styles.mainDashboardPositionHeader}>
            <Image style={styles.mainDashboardLogo} source={require('../../../images/smallLogo.png')} />
            <Text style={styles.nameText}>{`${t('mainDashboard.titleBeginning')}, ${fullName}`}</Text>
            <View style={styles.logoutPosition}>
                <TouchableOpacity onPress={handleLogout} >
                    <Image source={require('../../../images/logout.png')} />
                </TouchableOpacity>
            </View>


        </View>
    );
};

const styles = StyleSheet.create({
    mainDashboardPositionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        direction: 'rtl',
        gap: 80,
        top: -40
    },
    nameText: {
        fontSize: 24,
        color: 'white',
        marginTop: 80
    },
    mainDashboardLogo: {
        width: 32,
        height: 35,
        flexShrink: 0,
        top: -5,
        left: Platform.OS === "android" ? 362 : 20
    },
    logoutPosition: {
        right: Platform.OS === "android" ? 352 : 5,
    }
});

export default HeaderText;