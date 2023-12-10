import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Popup from '../popup';
import { SELLS_VIDEOS } from '../../constants';
import YoutubePlayer from 'react-native-youtube-iframe';

const SellsVideo = ({ open, setIsOpen, index }) => {
    const video = SELLS_VIDEOS[index];


    if (!video) {
        setIsOpen(false);
        return null;
    }

    const videosParts = video.split('/')


    const slice = videosParts[videosParts.length - 1];

    return (
        <Popup visible={open} onClose={setIsOpen}>
            <View style={styles.sellsVideo}>
                <YoutubePlayer
                    height={200}
                    width={280}
                    play={true}
                    videoId={slice}
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