import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentVideo, setSelectedIndex as setSelectedIndexToStore } from '../../redux/reducers/videosReducer';

const VideosSlider = ({ setIndexSells, setSellsPopupOpen, indexSells }) => {
    const { videos: videosFromStore, selectedIndex: selectedIndexFromStore } = useSelector(state => state.videos);
    const dispatch = useDispatch();
    const MOBILE_SELECTION_SIZE = 3;

    const handleSelectVideoMobile = (index) => {
        dispatch(setSelectedIndexToStore(index));
        dispatch(setCurrentVideo(videosFromStore[index]));
        if (indexSells % MOBILE_SELECTION_SIZE === 0 && indexSells) {
            setSellsPopupOpen(true);
        }
        setIndexSells(indexSells + 1);
    };

    const renderVideos = () => (
        <ScrollView contentContainerStyle={styles.videosSections}>
            {videosFromStore.map(({ title, link, _id, photoLink }, index) => (
                index !== selectedIndexFromStore && (
                    <TouchableOpacity key={_id} onPress={() => handleSelectVideoMobile(index)}>
                        <Image style={styles.videoPosition} source={{ uri: photoLink }} />
                        <Text style={styles.videoSliderTitle}>{title}</Text>
                    </TouchableOpacity>
                )
            ))}
        </ScrollView>
    );

    return (
        <View style={styles.videosSlider}>
            {renderVideos()}
        </View>
    );
};

const styles = StyleSheet.create({
    videosSlider: {
        top: 40,
        flex: 1
    },
    videosSections: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 40,

    },
    videoPosition: {
        width: 290,
        height: 180,
    },
    videoSliderTitle: {
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
        fontSize: 24,
        fontWeight: '400',
    },
});

export default VideosSlider;