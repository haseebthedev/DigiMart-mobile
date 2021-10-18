import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import myImage from '../../../assets/images/myImage.jpg';
import uploadIcon from '../../../assets/icons/uploadIcon.png';

const { width, height } = Dimensions.get('screen');

const AccountInfo = ({ navigation }) => {
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
        Account Information
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Image
          source={myImage}
          style={{
            width: 120,
            height: 120,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: '#fff'
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2
          }}
        >
          <Image
            source={uploadIcon}
            style={{ width: 20, height: 20, tintColor: COLORS.PRIMARY }}
          />
        </View>
      </View>
      <View style={{ marginTop: 40, width: width - 40 }}>
        <TextInput placeholder="Name" style={styles.userInput} />
        <TextInput placeholder="Email" style={styles.userInput} />
        <TextInput
          placeholder="Phone #"
          style={styles.userInput}
          keyboardType="number-pad"
        />
        <TextInput placeholder="Date of Birth" style={styles.userInput} />
      </View>
      <View style={styles.button}>
        <Text style={styles.loginButton}>UPDATE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  userInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginBottom: 10,
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph2
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginTop: 20
  },
  loginButton: {
    fontSize: FONTS.Paragraph1,
    fontFamily: FONTS.PoppinsBold,
    color: '#fff'
  }
});

export default AccountInfo;
