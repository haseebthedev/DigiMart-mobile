import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';
import { FONTS, COLOLRS, IMAGES } from '../constants/index';
const { width, height } = Dimensions.get('screen');

// icons
import kebabIcon from '../assets/icons/kebabMenuIcon.png';
import searchIcon from '../assets/icons/searchIcon.png';
import startChatIcon from '../assets/icons/startChatIcon.png';

// images
import myImage from '../assets/images/myImage.jpg';

const Messages = () => {
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
          // backgroundColor: 'red',
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

      <ScrollView>
        {/* List of Messages */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((el) => (
          <View
            key={el}
            style={{
              marginVertical: 10,
              flexDirection: 'row',
              paddingHorizontal: 20,
              alignItems: 'center'
            }}
          >
            <View>
              <Image
                source={myImage}
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
                    fontSize: FONTS.Paragraph1
                  }}
                >
                  Haseeb Ahmed
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2
                  }}
                >
                  Hi. This is a test message.
                </Text>
              </View>
              <View>
                <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
                  8:30 PM
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* New Message Button */}
      <View style={{ flex: 1, position: 'absolute', bottom: 20, right: 20 }}>
        <View
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
        </View>
      </View>
    </View>
  );
};

export default Messages;
