import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN_KEY } from "../constants";

export const validateEmail = (input) => {
    // Regular expression for basic email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailPattern.test(input);
};


export const validateName = (name) => {

    const pattern = /^[A-Za-z\u0590-\u05fe]+$/;

    const names = name.split(" ");
    for (const splittedName of names) {
        if (!pattern.test(splittedName)) return false;
    }
    return true;
}

export const validatePassword = password => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])[A-Za-z\d\W]{8,}$/; // Contains at least one uppercase letter,8 Length, one lowercase, one digit
    return passwordRegex.test(password);
}

export const validatePhone = phone => {
    const israeliPhoneRegex = /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/;
    return israeliPhoneRegex.test(phone);
}


export const changeCustomerTypeToAccessLayer = (t, valueToConvert) => {
    const objectOptions = {
        [t('customerType.free')]: "visitor",
        [t('customerType.premium')]: "client",
        [t('customerType.employee')]: "employee",
        [t('customerType.admin')]: "admin"
    }
    const entries = Object.entries(objectOptions);
    for (const [key, value] of entries) {
        if (key === valueToConvert) return value;
        if (value === valueToConvert) return key;
    }

    return "";

}


export const convertHourAndDateToDateObject = (date, hour) => {
    const [year, month, day] = date.split("-");
    const [hours, minutes] = hour.split(":");

    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
}


export const getOrigin = () => {
    const origin = process.env.PRODUCTION_URL || "http://192.168.1.32:3031";
    return origin;
}

export const getAccessToken = async tokenAccessToken => {
    if (tokenAccessToken) return tokenAccessToken;
    const storageToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
    return storageToken || "";
}