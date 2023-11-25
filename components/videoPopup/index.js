import React from 'react';
import { View, StyleSheet } from 'react-native';
import Popup from '../popup';
import { WebView } from 'react-native-webview';

const VideoPopup = ({ open, setIsOpen, video }) => {
    if (!video) return null;

    const slice = video.split('?')[1].split('&')[0].split('=')[1];
    const embeddedVideo = `https://www.youtube.com/embed/${slice}`;

    return (
        <Popup isOpen={open} setIsOpen={setIsOpen}>
            <View style={styles.videoPopup}>
                <WebView
                    style={styles.iframe}
                    source={{ uri: embeddedVideo }}
                />
            </View>
        </Popup>
    );
};


const styles = StyleSheet.create({
    videoPopup: {
        marginLeft: 5,
    },
    iframe: {
        marginTop: 20,
        width: 220,
        height: 165,
    },
});

export default VideoPopup;