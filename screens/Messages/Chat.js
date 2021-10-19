import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { FONTS, COLOLRS, IMAGES } from '../../constants/index';

// Images and Icons
import myImage from '../../assets/images/myImage.jpg';
import backBtnIcon from '../../assets/icons/backIcon.png';
import kebabIcon from '../../assets/icons/kebabMenuIcon.png';
import sendMessageIcon from '../../assets/icons/sendMessageIcon.png';

const Chat = ({ navigation }) => {
  const [MyId, setMyId] = useState(1);
  const [Messages, SetMessages] = useState([
    {
      id: 1,
      message: 'Hi, My Name is Haseeb. Merci!',
      lastChatTime: '8:10 AM'
    },
    {
      id: 2,
      message: 'Hello Haseeb, I am Customer Support.',
      lastChatTime: '8:11 AM'
    },
    {
      id: 1,
      message:
        'Why is this problem. It should be resolved as soon as possible.',
      lastChatTime: '8:11 AM'
    },
    {
      id: 2,
      message: 'Sir, We are doing everything on our side resolve this!',
      lastChatTime: '8:12 AM'
    },
    {
      id: 1,
      message:
        'Why is this problem. It should be resolved as soon as possible.',
      lastChatTime: '8:11 AM'
    },
    {
      id: 2,
      message: 'Sir, We are doing everything on our side resolve this!',
      lastChatTime: '8:12 AM'
    },
    {
      id: 1,
      message:
        'Why is this problem. It should be resolved as soon as possible.',
      lastChatTime: '8:11 AM'
    },
    {
      id: 2,
      message: 'Sir, We are doing everything on our side resolve this!',
      lastChatTime: '8:12 AM'
    },
    {
      id: 2,
      message: 'Sir, We are doing everything on our side resolve this!',
      lastChatTime: '8:12 AM'
    },
    {
      id: 1,
      message:
        'Why is this problem. It should be resolved as soon as possible.',
      lastChatTime: '8:11 AM'
    },
    {
      id: 2,
      message: 'Sir, We are doing everything on our side resolve this!',
      lastChatTime: '8:12 AM'
    }
  ]);

  // Message Item
  const renderItem = ({ item }) => {
    return (
      <View style={{ paddingHorizontal: 10 }}>
        <View
          style={{
            alignItems: item.id === MyId ? 'flex-end' : 'flex-start',
            margin: 8
          }}
        >
          <View
            style={{
              backgroundColor: item.id === MyId ? '#a6c1ff' : '#fff',
              width: width * 0.7,
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 8,
              elevation: 2
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins
              }}
            >
              {item.message}
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
              {item.lastChatTime}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#407BFF" />

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
            source={myImage}
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
              Haseeb Ahmed
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: -5
              }}
            >
              haseeb@gmail.com
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={kebabIcon}
            style={{ width: 24, height: 24, tintColor: '#fff' }}
          />
        </View>
      </View>

      {/* Messages Area */}
      <FlatList
        inverted
        contentContainerStyle={{
          flexDirection: 'column-reverse',
          paddingTop: 60
        }}
        data={Messages}
        renderItem={renderItem}
        keyExtractor={() => Math.random() * 1}
      />

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
          onPress={() =>
            SetMessages((prevMsg) => [
              ...prevMsg,
              {
                id: 1,
                message:
                  'Sir, We are doing everything on our side resolve this!',
                lastChatTime: '8:12 AM'
              }
            ])
          }
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;
