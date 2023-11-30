import React, { useEffect, useState } from 'react'
import { View } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import videoMomentumLogo from '../../images/VideoMomentumLogo.png';
import VideosSlider from '../../components/videoSlider';
import { videosByAccessLayerThunk } from '../../redux/thunk/videoThunk';
import { setIsLoading } from '../../redux/reducers/isLoadingReducer';
import { ACCESS_TOKEN_KEY } from '../../constants';
import { defineUserThunk, tokenThunkLogout } from '../../redux/thunk/tokenThunk';
import SellsVideo from '../../components/sellsVideo';
import VideoPopup from '../../components/videoPopup';
import { getAccessToken } from '../../utils';
import { ImageBackground } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { setActiveScreen } from '../../redux/reducers/activeScreenReducer';
import { setIsOpen } from '../../redux/reducers/menuReducer';
import { Text } from 'react-native';


const Videos = () => {

    const dispatch = useDispatch();

    const { currentVideo: { title, description, link, photoLink } } = useSelector(state => state.videos);
    const { accessToken: stateToken } = useSelector(state => state.token);
    const [accessToken, setAccessToken] = useState('');

    const [videoPopupOpen, setVideoPopupOpen] = useState(false);
    const [sellsPopupOpen, setSellsPopupOpen] = useState(false);

    const [indexSells, setIndexSells] = useState(0);
    const [videoIndex, setVideoIndex] = useState(0);

    useEffect(() => {
        const defineUser = async () => {
            const accessToken = await getAccessToken(stateToken);
            await dispatch(defineUserThunk(accessToken));
            await dispatch(videosByAccessLayerThunk(accessToken));
            dispatch(setIsLoading(false));
            setAccessToken(accessToken);
        }
        defineUser();

    }, [])

    const openVideo = () => {
        setVideoPopupOpen(true);
    }

    const handleLogout = async () => {
        const accessToken = await getAccessToken(stateToken);
        logoutUser(accessToken);
        await dispatch(tokenThunkLogout());
        dispatch(setActiveScreen(Routes.ENTRANCE));
        dispatch(setIsLoading(true));
        dispatch(setIsOpen(false));
    }


    return (
        <ImageBackground style={styles.videosPage} source={require('../../images/VideosBackground.png')}>
            <Image style={styles.imagePosition} source={require('../../images/videosLogo.png')} />
            <View style={styles.logoutPosition}>
                <TouchableOpacity onPress={handleLogout} >
                    <Image source={require('../../images/logout.png')} />
                </TouchableOpacity>
            </View>
            {link && <View>
                <TouchableOpacity onPress={openVideo}>
                    <Image
                        source={{ uri: photoLink }}
                        style={styles.currentVideo}
                    />
                    <Image source={require('../../images/Play.png')} style={styles.playIcon} />

                </TouchableOpacity>
            </View>}
            <View style={styles.videoTextPosition} >
                <Text style={styles.videoTitle}>{title}</Text>
                <Text style={styles.videoDescription}>{description}</Text>
            </View>
            <View>
                <VideosSlider indexSells={indexSells} setIndexSells={setIndexSells} setSellsPopupOpen={setSellsPopupOpen} />
            </View>
            <VideoPopup open={videoPopupOpen} setIsOpen={setVideoPopupOpen} video={link} />
            <SellsVideo index={videoIndex} open={sellsPopupOpen} setIsOpen={setSellsPopupOpen} />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    videosPage: {
        paddingBottom: 1000,
        alignItems: 'center'
    },
    imagePosition: {
        marginTop: 60
    },
    logoutPosition: {
        alignSelf: 'flex-start',
        left: 20,
        top: -60
    },
    currentVideo: {
        width: 319,
        height: 145,
        marginTop: 20
    },
    playIcon: {
        width: 32,
        height: 32,
        alignSelf: 'center',
        bottom: 90
    },
    videoTitle: {
        fontSize: 24,
        alignSelf: 'flex-start',
        textAlign: 'right',
        left: 30,
        bottom: 10
    },
    videoDescription: {
        fontSize: 16,
        left: 30,
        bottom: 10,
        marginTop: 10
    }

})

export default Videos;