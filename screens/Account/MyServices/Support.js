import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import { Picker } from '@react-native-picker/picker';
import reportProblemImage from '../../../assets/images/reportProblemImage.png';
const { width, height } = Dimensions.get('screen');

const Support = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 30
        }}
      >
        SUPPORT
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

      <View style={{ marginTop: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text
            style={{
              fontSize: FONTS.subhead4,
              fontFamily: FONTS.Poppins
            }}
          >
            Any problem? Reach out to us!
          </Text>
        </View>

        <TextInput placeholder="Order ID" style={styles.inputField} />
        <TextInput placeholder="Store Name" style={styles.inputField} />
        <TextInput placeholder="Subject of Issue" style={styles.inputField} />
        <TextInput
          placeholder="Description"
          multiline
          style={styles.inputField}
        />
        <View
          style={{
            marginHorizontal: 20,
            paddingLeft: 15,
            paddingVertical: 10,
            borderColor: '#e1e1e1',
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 22,
              marginRight: 8,
              color: '#407BFF'
            }}
          >
            +
          </Text>
          <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
            Upload Image / Screenshot
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.loginButton}>SEND</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputField: {
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph1,
    paddingTop: 15
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 10
  },
  loginButton: {
    fontSize: 18,
    fontFamily: FONTS.PoppinsBold,
    color: '#fff'
  }
});

export default Support;
