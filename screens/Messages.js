import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { FONTS, COLOLRS, IMAGES } from '../constants/index';
const { width, height } = Dimensions.get('screen');

// icons
import kebabIcon from '../assets/icons/kebabMenuIcon.png';
import searchIcon from '../assets/icons/searchIcon.png';
import startChatIcon from '../assets/icons/startChatIcon.png';

const Messages = ({ navigation }) => {
  const [Conversions, setConversions] = useState([
    {
      id: 1,
      name: 'Haseeb Ahmed',
      lastSentText: 'Hi, My problem is still there!',
      lastChatTime: '8:10 AM'
    },
    {
      id: 2,
      name: 'Ali',
      lastSentText: 'Yooo... Where are you guys?',
      lastChatTime: '8:11 AM'
    },
    {
      id: 3,
      name: 'Sir Tehseen Riaz Abbasi',
      lastSentText: 'Sir. Are you coming to Uni?',
      lastChatTime: '3:11 PM'
    },
    {
      id: 4,
      name: 'Hamza Abbasi',
      lastSentText: 'Bro, send the Assignment # 2!',
      lastChatTime: '7:43 AM'
    },
    {
      id: 5,
      name: 'Shahwaiz',
      lastSentText: 'Hi, My problem is still there!',
      lastChatTime: '8:10 AM'
    },
    {
      id: 6,
      name: 'Muhammad Ameen',
      lastSentText: 'Yooo... Where are you guys?',
      lastChatTime: '8:11 AM'
    },
    {
      id: 7,
      name: 'Jamal Saeed',
      lastSentText: 'Sir. Are you coming to Uni?',
      lastChatTime: '3:11 PM'
    },
    {
      id: 8,
      name: 'Faizan Bhatti',
      lastSentText: 'Bro, send the Assignment # 2!',
      lastChatTime: '7:43 AM'
    },
    {
      id: 9,
      name: 'Muhammad Ameen',
      lastSentText: 'Yooo... Where are you guys?',
      lastChatTime: '8:11 AM'
    },
    {
      id: 10,
      name: 'Jamal Saeed',
      lastSentText: 'Sir. Are you coming to Uni?',
      lastChatTime: '3:11 PM'
    }
  ]);

  // Contact Item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        key={item.id}
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
        onPress={() => navigation.navigate('Chat')}
      >
        <View>
          <Image
            source={{
              uri: `https://randomuser.me/api/portraits/med/men/${item.id}.jpg`
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
              {item.name}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph3,
                color: 'grey'
              }}
            >
              {item.lastSentText}
            </Text>
          </View>
          <View>
            <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
              {item.lastChatTime}
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
          <Image
            source={searchIcon}
            style={{
              width: 24,
              height: 24,
              marginRight: 20,
              tintColor: 'grey'
            }}
          />
          <Image
            source={kebabIcon}
            style={{ width: 24, height: 24, tintColor: 'grey' }}
          />
        </View>
      </View>

      {/* List of Messages */}
      <FlatList
        data={Conversions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      {/* New Message Button */}
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
        >
          <Image
            source={startChatIcon}
            style={{ width: 25, height: 25, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Messages;
