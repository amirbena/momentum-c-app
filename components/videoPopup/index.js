import React from 'react';
import { View, StyleSheet } from 'react-native';
import Popup from '../popup';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPopup = ({ open, setIsOpen, video }) => {
    if (!video) return null;

    const slice = video.split('?')[1].split('&')[0].split('=')[1];
    const embeddedVideo = `https://www.youtube.com/embed/${slice}`;

    return (
        <Popup visible={open} onClose={setIsOpen} showClose>
            <View style={styles.videoPopup}>
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
    videoPopup: {
        alignSelf: 'center',
        top: -20
    },
    iframe: {
        top: 200
    },
});

export default VideoPopup;