import { StyleSheet } from "react-native";
import { View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveScreen } from "../../redux/reducers/activeScreenReducer";
import { MATAN_GUY_LINK, Routes } from "../../constants";
import { useTranslation } from "react-i18next";
import { setSelectedMobileSelection } from "../../redux/reducers/menuReducer";
import { Linking } from "react-native";
import { Image } from "react-native-elements";


const NavigationPanel = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();


    const handleVideosScreen = () => {
        dispatch(setActiveScreen(Routes.VIDEOS_SECTION));
    }

    const navigateToNewProducts = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection(t('menu.newProducts')));
    }

    const navigateToHomePage = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection('menu.main'));
    }

    const navigateToMessaging = () => {
        dispatch(setActiveScreen(Routes.MAIN_DASHBOARD));
        dispatch(setSelectedMobileSelection('menu.messaging'));
    }

    const navigateToWhatsapp = () => {
        Linking.openURL(MATAN_GUY_LINK);
    };


    return (
        <View style={styles.panel}>
            <View >
                <TouchableOpacity onPress={handleVideosScreen} >
                    <Image source={require('../../images/videosScreen.png')} />
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={navigateToNewProducts} >
                    <Image source={require('../../images/newProducts.png')} />
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={navigateToHomePage} >
                    <Image source={require('../../images/homePage.png')} />
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={navigateToMessaging} >
                    <Image source={require('../../images/messaging.png')} />
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={navigateToWhatsapp} >
                    <Image source={require('../../images/WhatsappPanel.png')} />
                </TouchableOpacity>
            </View>

        </View >
    );
}


const styles = StyleSheet.create({
    panel: {
        alignSelf: 'center', // Align the item to the bottom
        backgroundColor: "#13143A",
        width: 300,
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    }
})

export default NavigationPanel;