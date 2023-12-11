import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch } from 'react-redux';
import { setIsLoading } from '../../redux/reducers/isLoadingReducer';
import { useTranslation } from 'react-i18next';
import { Routes } from '../../constants';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';

const EntranceScreen = () => {

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(setIsLoading(false));
        return () => {}
    }, []);

    const navigateToLogin = () => {
        dispatch(setIsLoading(true));
        dispatch(setActiveScreen(Routes.LOGIN));

    };

    const navigateToRegister = () => {
        dispatch(setIsLoading(true));
        dispatch(setActiveScreen(Routes.REGISTER))
    };

    return (
        <ImageBackground source={require('../../images/background-entrance.png')} style={styles.background}>
            <View>
                <Image source={require('../../images/MomenumCLogo.png')} style={styles.logo} />
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                        <Text style={styles.buttonText}>{t('entrance.login')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={navigateToRegister}>
                        <Text style={styles.buttonText2}>{t('entrance.register')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 298,
        height: 65,
    },
    buttonRow: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        gap: 80,
    },
    button: {
        width: 194,
        height: 54,
        borderRadius: 24,
        backgroundColor: '#2C2D6F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 4,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop:10
    },
    buttonText2: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: '400',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10
    }
});

export default EntranceScreen;