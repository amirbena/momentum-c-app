import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BlueSquare from '../blueSquare';
import { selectItemToMessagingPopup } from '../../redux/reducers/messagesReducer';

const MessagingInbox = () => {
    const { t } = useTranslation();
    const { messagesHistory } = useSelector(state => state.messages);
    const dispatch = useDispatch();

    const handleSelectMessage = (id) => {
        dispatch(selectItemToMessagingPopup(id));
    };

    return (
        <BlueSquare style={styles.container}>
            <Text style={styles.title}>{t('messagingInbox.title')}</Text>
            <FlatList
                data={messagesHistory}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handleSelectMessage(item.id)}>
                        <View style={item.id % 2 == 0 ? styles.messageEven : styles.messageOdd}>
                            <Text style={styles.text}>{item.title}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </BlueSquare>
    );
};

const styles = StyleSheet.create({
  
    container: {
      width: 360,
      height: 635,  
      alignItems: 'center',
    },
  
    title: {
      textAlign: 'right',
      fontSize: 24  
    },
  
    messageEven: {
      backgroundColor: '#13143A',
      padding: 10, 
      width: '100%'
    },
    
    text: {
      fontSize: 15
    }
    
  });
  

export default MessagingInbox;