import React from 'react';
import Popup from '../popup';
import { useDispatch, useSelector } from 'react-redux';
import { setNoAuthPopupOpen } from '../../redux/reducers/noAuthPopupReducer';
import { Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const FailurePopup = () => {

    const { isOpen } = useSelector(state => state.noAuthPopup);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    return (
        <Popup
            visible={isOpen}
            onClose={() => dispatch(setNoAuthPopupOpen(false))}
            showClose
        >
            <Text style={styles.text}>{t('failurePopup.text')}</Text>
        </Popup>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: 70,
        fontSize: 20,
        width: 220,
        textAlign: 'center',
        bottom: 20,
        left: 50
    },
});

export default FailurePopup;