import React from 'react';
import { View, Modal, StyleSheet, Image } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';

const Popup = ({ children, isDisabled, visible, onClose, showClose }) => {

  return (
    <Modal visible={visible} transparent>
      <BackgroundImage source={require("../../images/popupbackground.png")}  style={styles.container}>
          <View style={styles.innerContainer}>
            {showClose && (
              <Image
                style={styles.closeIcon}
                source={require('../../images/CloseIcon.png')}
                onPress={onClose}
              />
            )}
            <View style={styles.content}>{children}</View>
          </View>
      </BackgroundImage>
    </Modal>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    alignItems: 'center',
    justifyContent: 'center'
  },

  innerContainer: {
    width: 346,
    height: 254,
    borderRadius: 32,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  closeIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 12,
    right: 16
  },

  content: {
    width: 318,
    height: 212
  }

});

export default Popup;