import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Popup from '../popup';
import { SELLS_VIDEOS } from '../../constants';

const SellsVideo = ({ open, setIsOpen, index }) => {
    const video = SELLS_VIDEOS[index];

    if (!video) return null;

    return (
        <Popup isOpen={open} setIsOpen={setIsOpen}>
            <View style={styles.sellsVideo}>
                <WebView
                    style={styles.iframe}
                    source={{ uri: video }}
                />
            </View>
        </Popup>
    );
};


const styles = StyleSheet.create({
    sellsVideo: {
        marginLeft: 19,
        justifyContent: 'center',
    },
    iframe: {
        width: 220,
        height: 165,
    },
});

export default SellsVideo;