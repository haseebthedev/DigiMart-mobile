import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';

const { width, height } = Dimensions.get('screen');

const Settings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40
        }}
      >
        SETTINGS & CONFIG
      </Text>

      {/* Back Button */}
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 15,
            position: 'absolute',
            top: 20,
            left: 20
          }}
        >
          <Image
            source={backIcon}
            style={{ width: 25, height: 25, tintColor: 'black' }}
          />
        </View>
      </TouchableNativeFeedback>

      <View style={{ marginHorizontal: 20, width: width - 40 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderBottomColor: '#e1e1e1',
            borderTopColor: '#e1e1e1'
          }}
          onPress={() => navigation.navigate('AccountInfo')}
        >
          <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
            Account Information
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#e1e1e1'
          }}
          onPress={() => navigation.navigate('AddressBook')}
        >
          <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
            Address Book
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#e1e1e1'
          }}
          onPress={() => navigation.navigate('FAQ')}
        >
          <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>FAQ's</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#e1e1e1'
          }}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default Settings;
