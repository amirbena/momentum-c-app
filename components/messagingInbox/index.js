import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import BlueSquare from '../blueSquare';
import { selectItemToMessagingPopup } from '../../redux/reducers/messagesReducer';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

const MessagingInbox = () => {
  const { t } = useTranslation();
  const { messagesHistory } = useSelector(state => state.messages);
  const dispatch = useDispatch();

  const handleSelectMessage = (id) => {
    dispatch(selectItemToMessagingPopup(id));
  };


  return (
    <BlueSquare style={styles.messagingInboxPosition}>
      <Text style={styles.messagingInboxTitle}>{t('messagingInbox.title')}</Text>
      <ScrollView style={styles.messagingScrollInboxPosition} horizontal={false}>
        {messagesHistory.map((message, index) => (
          <View style={[styles.messagingSection, { backgroundColor: index % 2 === 0 ? '#13143A' : '#1E2052' }]}>
            <TouchableOpacity key={message._id} onPress={() => handleSelectMessage(message._id)}>
              <Text style={styles.messagingInboxParagraph}>{message.title}</Text>
            </TouchableOpacity>
          </View>

        ))}

      </ScrollView>
    </BlueSquare>
  );
};

const styles = StyleSheet.create({
  messagingInboxPosition: {
    width: 360,
    height: 505,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
    bottom: 200,
    paddingBottom: 40,
  },
  messagingInboxTitle: {
    color: '#FFF',
    textAlign: 'center',
    top: 40,
    fontSize: 24,
    fontWeight: '400',
  },
  messagingScrollInboxPosition: {
    marginTop: 50,
  },
  messagingSection: {
    textAlign: 'right',
    marginLeft: 44,
    fontWeight: '400',
    width: 340,
    right: 30,
    marginRight: 30,
    height: 48,
  },
  messagingInboxParagraph: {
    color: '#FFF',
    textAlign: 'right',
    right: 40,
    top: 10,
    fontSize: 15
  },
});



export default MessagingInbox;