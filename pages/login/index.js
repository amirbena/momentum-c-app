import React, { useEffect, useState } from 'react';
import { HttpStatusCode } from "axios";
import { LOGIN_KEYS, Routes } from "../../constants";
import { initLoginData, setLoginShowError, setLoginUser } from "../../redux/reducers/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setIsLoading } from "../../redux/reducers/isLoadingReducer";
import { userLoginThunk } from '../../redux/thunk/loginThunk';
import { setIsAdmin, setIsEmployee } from '../../redux/reducers/tokenReducer';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { ImageBackground, Keyboard, Platform, StyleSheet, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { styles as registerStyles } from '../register/register';
import { Button, Image, Text } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import { setSelectedMobileSelection } from '../../redux/reducers/menuReducer';
import { validateEmail } from '../../utils';


const Login = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const loginState = useSelector(state => state.login);

    const { email, password, validResponseCode, showError } = loginState;
    const [inputErrors, setInputErrors] = useState({
        email: false,
        password: false
    });

    const [localResults, setLocalResults] = useState({
        validResponse: false,
        responseText: ''
    });

    const [changedFirstTime, setChangeFirstTime] = useState(false);


    const [inputErrorTexts, setInputErrorTexts] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        dispatch(setIsLoading(false));
        return () => { }
    }, []);


    useEffect(() => {
        const results = {
            [HttpStatusCode.Forbidden]: t('login.forbiddenError'),
            [HttpStatusCode.Conflict]: t('login.conflictError'),
            [HttpStatusCode.NotFound]: t('login.notFoundError'),
            [HttpStatusCode.Ok]: t('login.okMessage')
        }
        setLocalResults({ validResponse: validResponseCode === HttpStatusCode.Ok, responseText: results[validResponseCode] })
        return () => { }
    }, [validResponseCode, t])

    const setLoginItem = (id, value) => {
        const loginUserItem = [id, value]
        if (!id) return "";
        dispatch(setLoginShowError(false));
        dispatch(setLoginUser(loginUserItem));
    }

    const validateInput = (id, value) => {

        if (!value) {
            return {
                isValid: false,
                text: t('login.isEmpty')
            }
        }
        const options = {
            [LOGIN_KEYS.EMAIL]: () => {
                const isValid = validateEmail(value);
                return {
                    isValid,
                    text: !isValid ? t('login.emailIncorrect') : ""
                }
            },
            [LOGIN_KEYS.PASSWORD]: () => {
                return {
                    isValid: true,
                    text: ""
                }
            }
        }
        return options[id]();
    }

    const handleBlur = (id, e) => {
        if (!id) return;
        const { value } = e._dispatchInstances.memoizedProps;
        const { isValid, text } = validateInput(id, value);
        setInputErrors(inputErrors => ({
            ...inputErrors,
            [id]: !isValid
        }))

        setInputErrorTexts(inputErrorTexts => ({
            ...inputErrorTexts,
            [id]: text
        }))
    }

    const inputs = [{ placeholder: LOGIN_KEYS.EMAIL, id: LOGIN_KEYS.EMAIL, type: "text", value: email }, { placeholder: LOGIN_KEYS.PASSWORD, id: LOGIN_KEYS.PASSWORD, value: password, type: "password" }]


    const isButtonEnabled = () => {
        const inputs = [LOGIN_KEYS.EMAIL, LOGIN_KEYS.PASSWORD];
        const isValidInputs = inputs.map(id => {
            return validateInput(id, loginState[id]).isValid;
        })
        const isEnabled = isValidInputs.every(isValidInput => isValidInput);

        if (isEnabled && !changedFirstTime) {
            setInputErrors({
                email: false,
                password: false,
            });
            setInputErrorTexts({
                email: "",
                password: ""
            })
            setChangeFirstTime(true);
        }
        if (!isEnabled && changedFirstTime) {
            setChangeFirstTime(false);
        }
        return isEnabled;
    }

    const initData = () => {
        dispatch(initLoginData());
    }

    const enabledButton = isButtonEnabled();


    const handleClick = async () => {
        Keyboard.dismiss();
        dispatch(setIsLoading(true));
        const result = await dispatch(userLoginThunk({ email, password }));
        if (result) {
            initData();
            if (result.isAdmin) {
                dispatch(setIsAdmin(true));
            }
            if (result.isEmployee) {
                dispatch(setIsEmployee(true));
            }
            dispatch(setActiveScreen(result.isVisitorUser ? Routes.VIDEOS_SECTION : Routes.MAIN_DASHBOARD))
            dispatch(setSelectedMobileSelection(result.isVisitorUser ? t('menu.videosList') : t('menu.main')));
        }
    }

    const navigateToRegister = () => dispatch(setActiveScreen(Routes.REGISTER));
    const navigateToForgotPassword = () => dispatch(setActiveScreen(Routes.FORGOT_PASSWORD));


    return (
        <ImageBackground source={require('../../images/register-background.png')} style={registerStyles.header}>
            <Image source={require("../../images/person.png")} style={registerStyles.icon} />
            <View style={showError ? styles.boxError : styles.box}>
                <Text style={registerStyles.boxHeader}>{t('login.header')}</Text>
                <TouchableOpacity style={Platform.OS === "android" ? styles.registerNavigate : styles.registerNavigateIos} onPress={navigateToRegister}>
                    <Text style={styles.registerNavigateText}>{t('register.navigateToLogin')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ top: -100, left: 0, width: 100, height: 100 }} onPress={Keyboard.dismiss}>
                </TouchableOpacity>
                <View style={styles.formLayout}>
                    {inputs.map(({ id, placeholder, value, type }) => (
                        <>
                            <View key={id}>
                                <TextInput
                                    key={`${id}1`}
                                    style={registerStyles.input}
                                    value={value}
                                    onChangeText={(text) => setLoginItem(id, text)}
                                    onBlur={e => handleBlur(id, e)}
                                    placeholder={t(`login.${placeholder}Placeholder`)}
                                    secureTextEntry={type === 'password'}
                                />
                                {inputErrors[id] && <Text key={`${id}2`} style={styles.errorMessage}>{inputErrorTexts[id]}</Text>}
                            </View>
                        </>
                    ))}
                </View>

                <TouchableOpacity style={styles.forgotPasswordLocation} onPress={navigateToForgotPassword}>
                    <Text style={styles.forgotPassword}>{t('login.forgotPassword')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={enabledButton ? styles.confirmButton : styles.confirmButtonDisabled}
                    onPress={handleClick}
                    disabled={!enabledButton}
                >
                    <Text style={registerStyles.confirmButtonText}>{t('register.continueButton')}</Text>
                </TouchableOpacity>
                {showError && <Text style={styles.confirmErrorMessage}>{localResults.responseText}</Text>}
            </View>
            <Image source={require('../../images/downMomentumRegister.png')} style={registerStyles.downMomentum} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 352,
        paddingBottom: Platform.OS === "ios" ? -10 : 10,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginTop: 30,
    },
    errorMessage: {
        color: 'brown',
        top: -20,
        marginBottom: -10,
        alignSelf: 'center'
    },
    boxError: {
        width: 352,
        paddingBottom: 20,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        marginTop: 30,
    },
    formLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: -80,
    },
    registerNavigateText: {
        color: 'white',
        textDecorationLine: 'underline',
        color: 'white',
        fontSize: 16,

    },
    registerNavigate: {
        top: -40,
        left: 280,
        width: 50,
    },
    registerNavigateIos: {
        top: -40,
        left: 290,
        width: 50,
    },
    confirmButton: {
        borderRadius: 8,
        backgroundColor: '#2C2D6F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        color: '#2C2D6F',
        fontSize: 20,
        fontWeight: '400',
        position: 'relative',
        alignItems: 'center',
        alignSelf: 'center',
        top: -50,
        padding: 9,
        width: 200,
    },
    forgotPassword: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '400',
        textDecorationLine: 'underline',
    },
    forgotPasswordLocation: {
        alignItems: 'center',
        top: -80
    },
    confirmButtonDisabled: {
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        color: '#929292',
        fontSize: 20,
        fontWeight: '400',
        position: 'relative',
        top: -50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 9,
        width: 200,
    },
    confirmErrorMessage: {
        color: '#DC143C',
        fontSize: 16,
        width: 350,
        textAlign: 'center',
        alignSelf: 'center',
        top: -20,
    },
})

export default Login;