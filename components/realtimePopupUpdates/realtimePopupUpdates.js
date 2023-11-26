import { styles } from "../popupMessages";

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { closeNotificationPopup } from '../../redux/reducers/messagesReducer';
import Popup from '../popup';
import { updatePopup, updateUser } from '../../network';
import { ACCESS_TOKEN_KEY } from '../../constants';
import { getAccessToken } from "../../utils";

export const RealTimePopupUpdates = () => {
    const { isPopupQueueOpen, selectedItemToPopup: { title, description, link, _id } } = useSelector(state => state.messages);
    const { accessToken: tokenAccessToken } = useSelector(state => state.token);
    const dispatch = useDispatch();

    useEffect(async () => {

        const accessToken = await getAccessToken(tokenAccessToken);
        if (isPopupQueueOpen) {
            updatePopup(accessToken, _id);
            dispatch(closeNotificationPopup());
        }
    }, [isPopupQueueOpen, _id, dispatch, tokenAccessToken]);

    const handleLink = () => {
        if (!link) return null;
        const messages = link.split('.');
        const linkType = messages[messages.length - 1];
        const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg'];

        if (allowedExtensions.find(allowedExtension => linkType.includes(allowedExtension))) {
            return (
                <Image source={{ uri: link }} style={styles.popupMessagesImage} />
            );
        }

        return (
            <TouchableOpacity onPress={() => handleLinkPress(link)}>
                <Text style={styles.popupMessagesHref}>{t('popupMessages.clickHere')}</Text>
            </TouchableOpacity>
        );
    };

    const handleLinkPress = () => {
        if (!link) return null;

        const messages = link.split('.');
        const linkType = messages[messages.length - 1];

        const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', "svg"];

        if (allowedExtensions.some(ext => linkType.includes(ext))) {

            return (
                <Image
                    style={styles.image}
                    source={{ uri: link }}
                />
            );
        };

        return (
            <Popup visible={isPopupQueueOpen} onClose={() =>{}} showClose>
                <View style={styles.popupMessages}>
                    <Text style={styles.popupMessagesTitle}>{title}</Text>
                    <Text style={styles.popupMessageDescripition}>{description}</Text>
                    <View style={styles.linkPosition}>
                        {handleLink()}
                    </View>
                </View>
            </Popup>
        );
    };
}