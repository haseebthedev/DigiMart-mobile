import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import { UserContext } from '../../contexts/UserContext';
import api from '../../axios/api';

// Images and Icons
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import backBtnIcon from '../../assets/icons/backIcon.png';
import kebabIcon from '../../assets/icons/kebabMenuIcon.png';
import sendMessageIcon from '../../assets/icons/sendMessageIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';

// socket io
import io from 'socket.io-client';
const SERVER = 'https://digi-mart-server.herokuapp.com';

const Chat = ({ route, navigation }) => {
  const { chatWith } = route.params;
  const { user } = UserContext();

  const socket = io(SERVER);
  const token = user.token;
  const userId = user._id;

  const [messageText, setMessageText] = useState('');
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedChat, setSelectedChat] = useState([]);
  const [messages, setMessages] = useState([]);
  const [ChatRecieverUser, setChatRecieverUser] = useState([]);
  const [DeleteChatModal, setDeleteChatModal] = useState(false);

  //for opening conversation
  const HandleConversationOfUser = async (conversation) => {
    setUsername(conversation.conversationUser.name);
    setEmail(conversation.conversationUser.email);

    //This is for user u want to chat with, send roomId of chat and userId
    socket.emit('subscribe', {
      room: conversation.chatRoomId,
      otherUserId:
        conversation.conversationUser != null
          ? conversation.conversationUser._id
          : ChatRecieverUser._id
    });

    //get conversation
    await api
      .get(`/buyer/chat/${conversation.chatRoomId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setSelectedChat(conversation);
        setMessages(res.data.conversation);
        setChatRecieverUser(res.data.chatReciever);
      })
      .catch((error) => console.log('ERROR: ', error));
  };

  // For Sending Message
  const SendMessage = () => {
    socket.emit('subscribe', {
      room: selectedChat.chatRoomId,
      otherUserId: selectedChat.conversationUser._id
    });

    //This is to send message to user
    socket.emit('chat', {
      currentLoggedInUserId: userId,
      roomId: messages[0].chatRoomId,
      messageText
    });

    setMessageText('');
  };

  const updateChatMessageAndConversation = () => {
    socket.on('message', (data) => {
      //if that conversation is opened then set messages else not
      if (selectedChat.chatRoomId === data.message.chatRoomId) {
        let temp = messages;
        temp.push(data.message);
        setMessages([...temp]);
      }
    });
  };

  //delete selected chat room
  const deleteSelectedChatRoom = async () => {
    await api
      .delete(`/buyer/chat/room/${selectedChat.chatRoomId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        api
          .get(`/buyer/chat/conversations/seller-to-buyer`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => navigation.goBack())
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
    setSelectedChat([]);
  };

  useEffect(() => {
    updateChatMessageAndConversation();
  }, [socket]);

  useEffect(() => {
    HandleConversationOfUser(chatWith);
  }, []);

  // ========================================================

  const getTimeInCorrectFormat = (timeString) => {
    timeString = new Date(timeString).toISOString();
    const timeString12hr = new Date(timeString).toLocaleTimeString(
      {},
      { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    );
    return timeString12hr;
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            alignItems:
              item.postedByUser === userId ? 'flex-end' : 'flex-start',
            margin: 8
          }}
        >
          <View
            style={{
              backgroundColor:
                item.postedByUser === userId ? '#a6c1ff' : '#fff',
              width: 240,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 6,
              elevation: 1
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins
              }}
            >
              {/* {item.message} */}
              {item.message.messageText}
            </Text>
            <Text
              style={{
                textAlign: 'right',
                marginBottom: -2,
                marginTop: 5,
                color: 'grey',
                fontFamily: FONTS.Poppins,
                fontSize: 12
              }}
            >
              {/* {item.createdAt.split('T')[0]} */}
              {getTimeInCorrectFormat(item.createdAt)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View
        style={{
          width: width,
          height: 60,
          backgroundColor: '#407BFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#e1e1e1'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backBtnIcon}
              style={{ width: 25, height: 25, tintColor: '#fff' }}
            />
          </TouchableOpacity>
          <Image
            source={
              ChatRecieverUser.profilePic
                ? { uri: ChatRecieverUser.profilePic }
                : imageNotAvailable
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: 3,
              backgroundColor: '#fff'
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.PoppinsBold,
                fontSize: 16
              }}
            >
              {userName}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: -5
              }}
            >
              {email}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPress={() => setDeleteChatModal(!DeleteChatModal)}
        >
          <Image
            source={deleteIcon}
            style={{ width: 24, height: 24, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>

      {/* Messages Area */}
      <FlatList
        inverted
        contentContainerStyle={{
          flexDirection: 'column-reverse',
          paddingTop: 60
        }}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      {/* Send Message here */}
      <View
        style={{
          // backgroundColor: '#fff',
          width: width,
          height: 50,
          alignItems: 'center',
          position: 'absolute',
          bottom: 5,
          paddingHorizontal: 20,
          flexDirection: 'row'
        }}
      >
        <TextInput
          placeholder="Message"
          multiline
          style={{
            fontFamily: FONTS.Poppins,
            fontSize: 14,
            backgroundColor: '#fff',
            width: width * 0.76,
            borderRadius: 35,
            paddingLeft: 15,
            paddingVertical: 9,
            elevation: 1
          }}
          value={messageText}
          onChangeText={(text) => setMessageText(text)}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#407BFF',
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            marginLeft: 5,
            elevation: 2
          }}
          onPress={() => SendMessage()}
        >
          <Image
            source={sendMessageIcon}
            style={{
              width: 30,
              height: 30,
              tintColor: 'white'
            }}
          />
        </TouchableOpacity>
      </View>

      {/* Delete Chat Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={DeleteChatModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: width * 0.8,
              padding: 30,
              elevation: 10,
              alignItems: 'center',
              borderRadius: 4
            }}
          >
            <Image
              source={deleteIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: 'red',
                marginBottom: 30
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.Paragraph1,
                marginBottom: 10
              }}
            >
              Are You Sure?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph2,
                textAlign: 'center',
                color: 'grey'
              }}
            >
              This will delete your entire Chat with this seller!
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setDeleteChatModal(false)}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: 'red',
                  borderRadius: 4,
                  marginLeft: 5
                }}
                onPress={() => {
                  deleteSelectedChatRoom();
                  setDeleteChatModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2,
                    color: '#fff'
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;
