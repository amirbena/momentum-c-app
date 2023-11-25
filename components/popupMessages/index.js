import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setIsMessagingPopupOpen } from '../../redux/reducers/messagesReducer';
import Popup from '../popup';
import { useTranslation } from 'react-i18next';

const PopupMessages = () => {
  const { isMessagingPopupOpen, selectedItemToPopup: { title, description, link } } = useSelector(state => state.messages);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const setIsOpen = (destVisible) => dispatch(setIsMessagingPopupOpen(destVisible));

  const handleLink = () => {
    if (!link) return null;

    const messages = link.split('.');
    const linkType = messages[messages.length - 1];
    const allowedExtensions = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'svg'];

    if (allowedExtensions.find(allowedExtension => linkType.search(allowedExtension) !== -1)) {
      return <Image source={{ uri: link }} style={styles.popupMessagesImage} />;
    }

    return (
      <TouchableOpacity onPress={() => handleLinkPress(link)}>
        <Text style={styles.popupMessagesHref}>
          {t('popupMessages.clickHere')}
        </Text>
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

    }

    return (
      <Text
        style={styles.text}
        onPress={() => Linking.openURL(link)}>
        {t('popupMessages.clickHere')}
      </Text>
    );
  };

  return (
    <Popup isOpen={isMessagingPopupOpen} setIsOpen={setIsOpen} hasX>
      <View style={styles.popupMessages}>
        <Text style={styles.popupMessagesTitle}>{title}</Text>
        <Text style={styles.popupMessageDescripition}>{description}</Text>
        <View style={styles.linkPosition}>{handleLink()}</View>
      </View>
    </Popup>
  );
};


export const styles = StyleSheet.create({
  popupMessages: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'column',
  },
  popupMessagesTitle: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 36,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  popupMessageDescripition: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  },
  linkPosition: {
    marginTop: 65,
  },
  popupMessagesImage: {
    width: 350,
    height: 300,
  },
  popupMessagesHref: {
    textAlign: 'center',
    fontFamily: 'Open Sans',
    fontSize: 24,
  },
  image: {
    width: 100,
    height: 50
  },
  text: {
    fontSize: 16,
    textDecorationLine: 'underline'
  }
});



export default PopupMessages;