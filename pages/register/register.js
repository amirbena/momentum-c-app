import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, ImageBackground, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Keyboard, Linking, Platform, } from 'react-native';
import icon from '../../images/person.png';
import { HEBREW, MOMENTUM_C_LEGAL, REGISTER_KEYS, Routes } from '../../constants';
import { useTranslation } from 'react-i18next';
import { validateEmail, validateName, validatePassword, validatePhone } from '../../utils';
import momentumRegiter from '../../images/downMomentumRegister.png';
import { setLoginShowError } from '../../redux/reducers/loginReducer';
import { initRegisterData, setCheckboxItem, setFormItem, setRegisterShowError } from '../../redux/reducers/registerReducer';
import { userRegisterThunk } from '../../redux/thunk/registerThunk';
import { setIsLoading } from '../../redux/reducers/isLoadingReducer';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { CheckBox } from 'react-native-elements';
import { setSelectedMobileSelection } from '../../redux/reducers/menuReducer';

const Register = () => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const registerState = useSelector(state => state.register);
    const { name, email, password, phone, passwordVerification, acceptedCondition, above18, validResponse, showError } = registerState;

    const [inputErrors, setInputErrors] = useState({
        name: false,
        email: false,
        password: false,
        passwordVerification: false
    });

    const [localResults, setLocalResults] = useState({
        validResponse: false,
        responseText: ''
    });

    const [changedFirstTime, setChangeFirstTime] = useState(false);



    const [inputErrorTexts, setInputErrorTexts] = useState({
        name: "",
        email: "",
        password: "",
        passwordVerification: ""
    });

    useEffect(() => {
        dispatch(setIsLoading(false));
        return () => { }
    }, []);

    useEffect(() => {
        setLocalResults({ validResponse, responseText: !validResponse ? t('register.conflctError') : t('register.successText') });
    }, [validResponse]);

    const navigateToEntrancePage = () => {
        dispatch(setIsLoading(true));
        dispatch(setActiveScreen(Routes.ENTRANCE));
    };

    const setLocalFormItem = (value, id) => {
        dispatch(setRegisterShowError(false));
        dispatch(setFormItem([id, value]));
    };

    const setLocalCheckboxItem = (checked, id) => {
        dispatch(setRegisterShowError(false));
        dispatch(setCheckboxItem([id, checked]));
    };

    const validateInput = (id, value) => {
        if (!value) {
            return {
                isValid: false,
                text: t('register.isEmpty')
            };
        }
        const options = {
            [REGISTER_KEYS.EMAIL]: () => {
                const isValid = validateEmail(value);
                return {
                    isValid,
                    text: !isValid ? t('register.emailIncorrect') : ""
                };
            },
            [REGISTER_KEYS.NAME]: () => {
                const isValid = validateName(value, i18n.language);
                return {
                    isValid,
                    text: !isValid ? t('register.nameIncorrect') : ""
                };
            },
            [REGISTER_KEYS.PASSWORD]: () => {
                const isValid = validatePassword(value);
                return {
                    isValid,
                    text: !isValid ? t('register.passwordIncorrect') : ""
                };
            },
            [REGISTER_KEYS.PHONE]: () => {
                const isValid = validatePhone(value);
                return {
                    isValid,
                    text: !isValid ? t('register.phoneIncorrect') : ""
                };
            },
            [REGISTER_KEYS.PASSWORD_VERIFICATION]: () => {
                const isValid = password === passwordVerification;
                return {
                    isValid,
                    text: !isValid ? t('register.passwordsNotMatch') : ""
                };
            }
        };
        return options[id]();
    };

    const handleBlur = (id, e, input) => {
        const { value } = e._dispatchInstances.memoizedProps;
        const { isValid, text } = validateInput(id, value);
        setInputErrors(prevInputErrors => ({
            ...prevInputErrors,
            [id]: !isValid
        }));

        setInputErrorTexts(prevInputErrorTexts => ({
            ...prevInputErrorTexts,
            [id]: text
        }));
    };

    const inputs = [
        { placeholder: "fullName", id: REGISTER_KEYS.NAME, value: name, type: "text" },
        { placeholder: "email", id: REGISTER_KEYS.EMAIL, type: "text", value: email },
        { placeholder: "phone", id: REGISTER_KEYS.PHONE, type: "tel", value: phone },
        { placeholder: "password", id: REGISTER_KEYS.PASSWORD, value: password, type: "password" },
        { placeholder: "passwordVerifaction", id: REGISTER_KEYS.PASSWORD_VERIFICATION, value: passwordVerification, type: "password" }
    ];

    const isButtonEnabled = () => {
        const inputs = [REGISTER_KEYS.EMAIL, REGISTER_KEYS.NAME, REGISTER_KEYS.PASSWORD, REGISTER_KEYS.PASSWORD_VERIFICATION]
        const isValidInputs = inputs.map(id => {
            return validateInput(id, registerState[id]).isValid;
        })
        isValidInputs.push(acceptedCondition, above18);
        const isEnabled = isValidInputs.every(isValidInput => isValidInput);

        if (isEnabled && !changedFirstTime) {
            setInputErrors({
                name: false,
                email: false,
                password: false,
                passwordVerification: false
            });
            setInputErrorTexts({
                name: "",
                email: "",
                password: "",
                passwordVerification: ""
            });
            setChangeFirstTime(true);
        }
        if (!isEnabled && changedFirstTime) {
            setChangeFirstTime(false);
        }
        return isEnabled;
    };

    const initData = () => {
        dispatch(initRegisterData());
    };

    const handleClick = async () => {
        dispatch(setIsLoading(true));
        Keyboard.dismiss();
        const result = await dispatch(userRegisterThunk({ fullName: name, email, password, phoneNumber: phone }));
        if (result) {
            initData();
            dispatch(setActiveScreen(Routes.VIDEOS_SECTION));
            dispatch(setSelectedMobileSelection(t('menu.videosList')))
        }
    };

    const enabledButton = isButtonEnabled();


    return (
        <ImageBackground source={require('../../images/register-background.png')} style={styles.header}>
            <Image source={require("../../images/person.png")} style={styles.icon} />
            <View style={showError ? styles.boxError : styles.box}>
                <Text style={styles.boxHeader}>{t('register.header')}</Text>
                <TouchableOpacity style={styles.loginNavigate} onPress={navigateToEntrancePage}>
                    <Text style={styles.loginNavigateText}>{t('register.navigateToLogin')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ top: -100, left: 0, width: 100, height: 100 }} onPress={Keyboard.dismiss}>
                </TouchableOpacity>
                <View style={styles.formLayout}>
                    {inputs.map(({ id, placeholder, value, type }) => (
                        <>
                            <TextInput
                                key={id}
                                style={styles.input}
                                value={value}
                                onChangeText={text => setLocalFormItem(text, id)}
                                onBlur={(e) => handleBlur(id, e)}
                                placeholder={t(`register.${placeholder}Placeholder`)}
                                keyboardType={type === 'email' ? 'email-address' : id === REGISTER_KEYS.PHONE ? 'phone-pad' : 'default'}
                                secureTextEntry={type === 'password'}
                            />
                            {inputErrors[id] && <Text style={styles.errorMessage}>{inputErrorTexts[id]}</Text>}
                        </>
                    ))}
                </View>


                <View style={styles.checkboxContainer}>
                    <View style={styles.firstCheckbox}>
                        <CheckBox checked={!!acceptedCondition} checkedColor='#fff' onPress={() => setLocalCheckboxItem(!acceptedCondition, REGISTER_KEYS.ACCEPTED_CONDITION)} />
                        <Text style={styles.checkboxText}>{t('register.firstCheckboxText')}</Text>
                        <TouchableOpacity style={styles.legalLink} onPress={() => Linking.openURL(MOMENTUM_C_LEGAL)}>
                            <Text style={styles.legalText}>{t('register.legal')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.secondCheckbox}>
                        <CheckBox checked={!!above18} checkedColor='#fff' onPress={() => setLocalCheckboxItem(!above18, REGISTER_KEYS.ABOVE_18)} />
                        <Text style={styles.checkboxText}>{t('register.above18')}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={enabledButton ? styles.confirmButton : styles.confirmButtonDisabled}
                    onPress={handleClick}
                    disabled={!enabledButton}
                >
                    <Text style={styles.confirmButtonText}>{t('register.continueButton')}</Text>
                </TouchableOpacity>
                {showError && <Text style={styles.confirmErrorMessage}>{localResults.responseText}</Text>}
            </View>
            <Image source={require('../../images/downMomentumRegister.png')} style={styles.downMomentum} />
        </ImageBackground>
    );
};

export const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
    },
    icon: {
        marginTop: 60,
        width: 50,
        height: 50
    },
    box: {
        width: 352,
        height: 595,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        marginTop: 10,
    },
    boxError: {
        width: 352,
        height: 615,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.10)',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 10,
        marginTop: 10,
    },
    boxHeader: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'center',
        marginTop: 20
    },
    formLayout: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: -80,
    },
    input: {
        backgroundColor: '#D9D9D9',
        borderRadius: 8,
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        padding: 9,
        width: 300,
        marginBottom: 29,
    },
    loginNavigate: {
        left: 270,
        top: -30,
        width: 60
    },
    loginNavigateText: {
        color: 'white',
        textDecorationLine: 'underline',
        textAlign: 'right',
        color: 'white',
        fontSize: 16,

    },
    errorMessage: {
        color: 'brown',
        top: -25,
        marginBottom: -10
    },
    checkboxContainer: {
        marginTop: -16,
        alignSelf: 'center',
        direction: 'lrt',
    },
    firstCheckbox: {
        position: 'relative',
        top: -86,
        flexDirection: 'row-reverse',
        direction: Platform.OS === "android" ? 'rtl' : 'ltr',
        alignItems: 'center',
        right: 2
    },
    checkboxLabel: {
        flexDirection: 'row',
        direction: 'rtl',
        alignItems: 'center',
    },
    checkboxInput: {
        marginLeft: 10,
        height: 16,
        width: 16,
        top: -14,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#026100',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#026100',
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    checkboxText: {
        color: '#FFF',
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 16,
        right: -1,
        position: 'relative',
        top: 1,
    },
    legalLink: {
        marginLeft: 5,
    },
    legalText: {
        color: '#FFF',
        fontSize: 16,
        textDecorationLine: 'underline',
        position: 'relative',
        top: -1,
    },
    secondCheckbox: {
        position: 'relative',
        left: -10,
        top: -104,
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },
    confirmButton: {
        borderRadius: 8,
        backgroundColor: '#2C2D6F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        color: '#2C2D6F',
        fontSize: 20,
        fontWeight: '400',
        position: 'relative',
        top: -105,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        width: 300,
        left: 25
    },
    confirmButtonDisabled: {
        borderRadius: 8,
        backgroundColor: '#D9D9D9',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        color: '#929292',
        fontSize: 20,
        fontWeight: '400',
        position: 'relative',
        top: -105,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 9,
        width: 300,
        left: 25
    },
    confirmButtonText: {
        color: '#FFF',
    },
    confirmErrorMessage: {
        color: '#DC143C',
        fontSize: 16,
        marginTop: -74,
        width: 200,
        textAlign: 'center',
        left: 70
    },
    downMomentum: {
        width: 32.5,
        height: 35,
        marginTop: 10,
    },
});

export default Register;