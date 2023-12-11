import React from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedMobileSelection } from '../../redux/reducers/menuReducer';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { MATAN_GUY_LINK, Routes } from '../../constants';

const CustomBottomNavigation = () => {

    const { selectedMobileSelection } = useSelector(state => state.menu);
    const { index: activeScreen } = useSelector(state => state.activeScreen)
    const dispatch = useDispatch();
    const { t } = useTranslation();


    const handleVideosScreen = () => {
        dispatch(setActiveScreen(Routes.VIDEOS_SECTION));
        dispatch(setSelectedMobileSelection(t('menu.videosList')));
    }

    const navigateToNewProducts = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection(t('menu.newProducts')));
    }

    const navigateToHomePage = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection(t('menu.main')));
    }

    const navigateToMessaging = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection(t('menu.messaging')));
    }

    const navigateToWhatsapp = () => {
        Linking.openURL(MATAN_GUY_LINK);
    };


    return (
        <View style={[styles.container, { bottom: activeScreen === Routes.MAIN_DASHBOARD ? Platform.OS === "android" ? 342 : 322 : 402  }]}>
            <TouchableOpacity style={selectedMobileSelection === t('menu.videosList') ? styles.selectedTab : styles.tab} onPress={handleVideosScreen}>
                <Image
                    source={require('../../images/videosScreen.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={selectedMobileSelection === t('menu.newProducts') ? styles.selectedTab : styles.tab} onPress={navigateToNewProducts}>
                <Image
                    source={require('../../images/newProducts.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={selectedMobileSelection === t('menu.main') ? styles.selectedTab : styles.tab} onPress={navigateToHomePage}>
                <Image
                    source={require('../../images/homePage.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={selectedMobileSelection === t('menu.messaging') ? styles.selectedTab : styles.tab} onPress={navigateToMessaging}>
                <Image
                    source={require('../../images/messaging.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab} onPress={navigateToWhatsapp}>
                <Image
                    source={require('../../images/WhatsappPanel.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Add more tabs as needed */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#13143A',
        height: 90
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomColor: '#fff',
    },
    icon: {
        width: 30,
        height: 30,
    }
});

export default CustomBottomNavigation;