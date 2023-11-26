import { useTranslation } from "react-i18next";
import { ImageBackground, Keyboard, StyleSheet, View } from "react-native";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setActiveScreen } from "../../redux/reducers/activeScreenReducer";
import { setIsLoading } from "../../redux/reducers/isLoadingReducer";
import { initForgotPasswordData, setEmail } from "../../redux/reducers/forgotPasswordReducer";
import { forgotPasswordThunk } from '../../redux/thunk/forgotPasswordThunk';
import { HttpStatusCode } from "axios";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-elements";
import { ENGLISH_FULL_LANGUAGE, HEBREW, HEBREW_FULL_LANGUAGE, Routes } from "../../constants";

const ForgotPassword = () => {
    const { email, validResponseCode } = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [showError, setShowError] = useState(false);

    const [emailInputError, setEmailInputError] = useState(false);
    const [emailInputErrorText, setEmailInputErrorText] = useState("");


    const [changedFirstTime, setChangeFirstTime] = useState(false);

    const navigateToLogin = () => dispatch(setActiveScreen(Routes.LOGIN));

    const [localResults, setLocalResults] = useState({
        validResponse: false,
        responseText: ''
    });

    useEffect(() => {
        dispatch(setIsLoading(false));
    }, [])


    const handleEmailChange = text => {
        setShowError(false);
        dispatch(setEmail(text));
    }

    useEffect(() => {
        const results = {
            [HttpStatusCode.NotFound]: t('forgotPassword.notFoundError'),
            [HttpStatusCode.Ok]: t('forgotPassword.okMessage'),
            [HttpStatusCode.InternalServerError]: t('forgotPassword.internalServerError')
        }
        setLocalResults({ validResponse: validResponseCode === HttpStatusCode.Ok, responseText: results[validResponseCode] })
    }, [validResponseCode, t])

    const validateInput = () => {

        if (!email) {
            return {
                isValid: false,
                text: t('login.isEmpty')
            }
        }
        return {
            isValid: true,
            text: ""
        }
    }

    const initData = () => {
        dispatch(initForgotPasswordData());
    }

    const handleBlur = () => {
        const { isValid, text } = validateInput();
        setEmailInputError(!isValid);
        setEmailInputErrorText(text)
    }

    const handleClick = async () => {
        dispatch(setIsLoading(true));
        setShowError(true);
        const result = await dispatch(forgotPasswordThunk({ email, language: i18n.language === HEBREW ? HEBREW_FULL_LANGUAGE : ENGLISH_FULL_LANGUAGE }));
        dispatch(setIsLoading(false));
        if (result.payload) {
            initData();

        }
    }

    const isButtonEnabled = () => {
        const { isValid: isEnabled } = validateInput();


        if (isEnabled && !changedFirstTime) {
            setEmailInputError(false);
            setEmailInputErrorText("");
            setChangeFirstTime(true);
        }
        if (!isEnabled && changedFirstTime) {
            setChangeFirstTime(false);
        }
        return isEnabled;
    }


    const enabledButton = isButtonEnabled();
    return (
        <ImageBackground
            source={require('../../images/forgotPasswordMobilePassword.png')}
            style={styles.forgotPasswordPage}
        >
            <View style={styles.forgotPasswordBox}>
                <Text style={styles.forgotPasswordLoginNavigate} onPress={navigateToLogin}>{t("forgotPassword.navigateToLogin")}</Text>
                <Text style={styles.forgotPasswordHeaderText}>{t('forgotPassword.header')}</Text>
                <View style={{ width: 50, height: 100, left: -5 }}>
                    <TouchableOpacity onPress={Keyboard.dismiss}>
                    </TouchableOpacity>
                </View>

                <Text style={styles.previewText}>
                    {t('forgotPassword.previewTextPart1')}
                    {'\n'}
                    {t('forgotPassword.previewTextPart2')}
                </Text>
                <View style={styles.forgotPasswordFormLayout}>
                    <TextInput
                        style={styles.emailInput}
                        value={email}
                        onChangeText={handleEmailChange}
                        placeholder={t(`forgotPassword.emailPlaceholder`)}
                        onBlur={handleBlur}
                        keyboardType="email-address"
                    />
                    {emailInputError && <Text style={styles.errorMessage}>{emailInputErrorText}</Text>}
                </View>
                <TouchableOpacity
                    onPress={handleClick}
                    disabled={!enabledButton}
                    style={[styles.forgotPasswordConfirmButton, { backgroundColor: !enabledButton ? '#D9D9D9' : '#2C2D6F' }]}
                >
                    <Text style={[styles.confirmButtonText, { color: !enabledButton ? '#929292' : 'white' }]}>{t('login.continueButton')}</Text>
                </TouchableOpacity>
                {showError && <Text style={styles.confirmErrorMessage}>{localResults.responseText}</Text>}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    forgotPasswordPage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        height: 1083
    },
    forgotPasswordHeaderText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '400',
        lineHeight: 58,
        marginTop: -90,
        marginLeft: 14
    },
    forgotPasswordBox: {
        width: 328,
        height: 336,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 10,
        shadowOpacity: 1,
        top: -50
    },
    forgotPasswordLoginNavigate: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
        textDecorationLine: 'underline',
        marginTop: 10,
        right: -280
    },
    previewText: {
        fontSize: 16,
        fontWeight: '400',
        letterSpacing: 0,
        color: 'white',
        marginTop: -30,
        textAlign: 'center',
        width: 300,
        left: 14
    },
    forgotPasswordFormLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    emailInput: {
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        color: 'black',
        width: 250,
        fontSize: 16,
        textAlign: 'center',
        height: 37,
        marginBottom: 29,
    },
    forgotPasswordConfirmButton: {
        borderRadius: 8,
        backgroundColor: '#2C2D6F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        color: '#929292',
        fontWeight: '400',
        position: 'relative',
        top: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        width: 250,
        left: 40
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: '400',

    },
    errorMessage: {
        color: 'blue',
        top: -20,
        marginBottom: -10
    },
    confirmErrorMessage: {
        color: 'blue',
        width: 180,
        textAlign: 'center',
        fontSize: 16,
        left: 75,
        marginTop: 44,
    },
});

export default ForgotPassword;