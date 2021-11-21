import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../constants/index';
const { width, height } = Dimensions.get('screen');
import api from '../axios/api';
import { UserContext } from '../contexts/UserContext';

// socket io
import io from 'socket.io-client';
const SERVER = 'https://digi-mart-server.herokuapp.com';

// icons
import startChatIcon from '../assets/icons/startChatIcon.png';
import accountIcon from '../assets/icons/accountIcon.png';
import mailIcon from '../assets/icons/mailIcon.png';
import unfollowStoreIcon from '../assets/icons/unfollowStoreIcon.png';

const Messages = ({ navigation }) => {
  const { user } = UserContext();
  const token = user.token;
  const userId = user._id;
  const socket = io(SERVER);
  const [conversations, setConversations] = useState([]);

  const [SearchUserModal, setSearchUserModal] = useState(false);
  const [SearchedUsers, setSearchedUsers] = useState([]);

  // For marking message as Read
  const makeConversationOfRoomRead = (conversaton) => {
    //set all messages read of that conversation and get messages that are not read
    api
      .patch(
        `/buyer/chat/${conversaton.chatRoomId}/mark-read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(async (res) => {})
      .catch((error) => console.log(error));
  };

  // For opening conversation
  const HandleConversationOfUser = async (conversation) => {
    //This is for user u want to chat with, send roomId of chat and userId
    socket.emit('subscribe', {
      room: conversation.chatRoomId,
      otherUserId:
        conversation.conversationUser != null
          ? conversation.conversationUser._id
          : ChatRecieverUser._id
    });
    makeConversationOfRoomRead(conversation);
    navigation.navigate('Chat', {
      chatWith: conversation
    });
  };

  //start new chat with user
  const startChatWithUser = (user) => {
    setSearchUserModal(false);

    let newConversation = '';

    api
      .post(
        `/buyer/chat/initiate`,
        {
          userIds: [user.sellerId],
          type: 'seller-to-buyer'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then((res) => {
        newConversation = res.data.data.newConversationInitiated;
        HandleConversationOfUser(newConversation);
      })
      .catch((error) => console.log(error));
  };

  //Search Buyer
  const searchBuyer = async (searchQuery) => {
    await api
      .get(`/buyer/search/store/${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        let data = res.data.data.Stores;
        setSearchedUsers(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    //This is to identify current logged in user
    socket.emit('identity', userId);
    api
      .get(`/buyer/chat/conversations/seller-to-buyer`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setConversations(res.data.recentConversation);
      })
      .catch((error) => console.log(error));
  }, [socket]);

  const readAtTime = (data) => {
    let d = data[0][0].readAt;

    var date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (d = dd + '/' + mm + '/' + yyyy);
  };

  function trimName(name) {
    let res = '';
    if (name.length > 30) {
      res = name.toString().substring(0, 30) + '...';
    } else {
      res = name;
    }
    return res;
  }

  // Contact Item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
        onPress={() =>
          navigation.navigate('Chat', {
            chatWith: item
          })
        }
      >
        <View>
          <Image
            source={{
              uri: item.conversationUser.profilePic
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 30,
              marginRight: 15
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.Paragraph2
              }}
            >
              {item.conversationUser.name}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph3,
                color: 'grey'
              }}
            >
              {/* {item.lastSentText} */}
              {trimName(item.message.messageText)}
            </Text>
          </View>
          <View>
            <Text
              style={{ fontFamily: FONTS.Poppins, fontSize: 12, color: 'grey' }}
            >
              {readAtTime(item.readByRecipients)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff'
      }}
    >
      {/* Top Header */}
      <View
        style={{
          width: width,
          height: 60,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20
        }}
      >
        <View>
          <Text style={{ fontFamily: FONTS.Poppins, fontSize: FONTS.subhead3 }}>
            Messages
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {/* <Image
            source={searchIcon}
            style={{
              width: 24,
              height: 24,
              marginRight: 20,
              tintColor: 'grey'
            }}
          /> */}
          {/* <Image
            source={kebabIcon}
            style={{ width: 24, height: 24, tintColor: 'grey' }}
          /> */}
        </View>
      </View>

      {/* List of Messages */}
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      {/* Search Users for Chat Button */}
      <View style={{ flex: 1, position: 'absolute', bottom: 20, right: 20 }}>
        <TouchableOpacity
          style={{
            width: 55,
            height: 55,
            borderRadius: 30,
            backgroundColor: '#407BFF',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 4
          }}
          onPress={() => setSearchUserModal(true)}
        >
          <Image
            source={startChatIcon}
            style={{ width: 25, height: 25, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType={'fade'}
        visible={SearchUserModal}
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
              height: height * 0.6,
              padding: 10,
              elevation: 10,
              alignItems: 'center',
              borderRadius: 4
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: 16,
                marginTop: 10,
                marginBottom: 20
              }}
            >
              Select User to Chat
            </Text>
            <TouchableOpacity
              onPress={() => setSearchUserModal(false)}
              style={{
                position: 'absolute',
                top: 15,
                right: 15
              }}
            >
              <Image
                source={unfollowStoreIcon}
                style={{
                  width: 20,
                  height: 20
                }}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="Search Users"
              style={{
                width: 240,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e1e1e1',
                marginHorizontal: 20,
                marginBottom: 20,
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph1,
                paddingTop: 15
              }}
              onChangeText={(text) => searchBuyer(text)}
            />

            <ScrollView>
              {SearchedUsers.map((el, index) => {
                return (
                  <View
                    key={el._id}
                    style={{
                      width: width * 0.75,
                      height: 50,
                      marginBottom: 20,
                      paddingHorizontal: 10
                    }}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <Image
                          source={{
                            uri: el.logo
                          }}
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 30,
                            marginRight: 10
                          }}
                        />
                        <View>
                          <Text
                            style={{
                              fontFamily: FONTS.PoppinsBold,
                              fontSize: 14
                            }}
                          >
                            {el.name}
                          </Text>
                          <Text
                            style={{
                              fontFamily: FONTS.Poppins,
                              fontSize: 10,
                              marginTop: -5
                            }}
                          >
                            Seller: {el.sellerName}
                          </Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{ alignItems: 'center' }}
                        onPress={() => startChatWithUser(el)}
                      >
                        <Image
                          source={mailIcon}
                          style={{ width: 20, height: 20 }}
                        />
                        <Text
                          style={{
                            fontFamily: FONTS.Poppins,
                            fontSize: 12
                          }}
                        >
                          Chat
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Messages;
