import React from 'react';
import { View, Modal, StyleSheet, Image,TouchableOpacity } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';

const Popup = ({ children, isDisabled, visible, onClose, showClose }) => {

  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <BackgroundImage source={require("../../images/popupbackground.png")} style={styles.container}>
        <View style={styles.innerContainer}>
          {showClose && (
            <>
              <TouchableOpacity onPress={onClose}>
                <Image
                  style={styles.closeIcon}
                  source={require('../../images/CloseIcon.png')}
                  onPress={onClose}
                />
              </TouchableOpacity>

            </>
          )}

          <View style={styles.content}>{children}</View>
        </View>
      </BackgroundImage>
    </Modal>
  );
}

const styles = StyleSheet.create({

  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 250,
    width: 300,
    borderRadius: 32,
    height: 250
  },

  innerContainer: {
    width: 270,
    height: 184,
    borderRadius: 32,
    alignItems: 'center',
    backgroundColor: 'white'
  },

  closeIcon: {
    right: -130,
    bottom: 30,
    width: 30,
    height: 30,
    color: 'red'
  },

  content: {
    width: 318,
    height: 212
  }

});

export default Popup;