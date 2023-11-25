// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { he } from './he';
import { en } from './en';
import { LANGUAGE_KEY } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';


var language = "";
AsyncStorage.getItem(LANGUAGE_KEY).then(result => {
    language = result || "he";

}).catch(() => language = "he");



i18n
    .use(initReactI18next)
    .init({
        resources: {
            he: {
                translation: {
                    ...he
                }
            },
            en: {
                translation: {
                    ...en
                }
            }
        },
        lng: language || 'he', // Set the default language
        interpolation: {
            escapeValue: false, // React already escapes strings
        },
    });

export default i18n;
