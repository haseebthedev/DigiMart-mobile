import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Toast from 'react-native-toast-message';
import api from '../../../axios/api';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import { UserContext } from '../../../contexts/UserContext';
import { Picker } from '@react-native-picker/picker';

const Support = ({ navigation }) => {
  const { user } = UserContext();
  const [storeId, setStoreId] = useState('6128c6ec00130918d0120ec4');
  const [orderId, setOrderId] = useState('');
  const [storeName, setStoreName] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [screenShot, setScreenShot] = useState('');

  const contactSupport = async () => {
    await api
      .post(
        '/buyer/problem/report/order',
        {
          storeId,
          orderId,
          storeName,
          subject,
          description,
          screenShot
        },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      .then((res) => {
        Toast.show({
          type: 'success',
          text1: 'SUCCESS!',
          text2: 'Your report has been sent!',
          onShow: () => {
            setStoreId('');
            setOrderId('');
            setStoreName('');
            setSubject('');
            setDescription('');
            setScreenShot('');
          }
        });
      })
      .catch((error) =>
        console.log('ERROR: Contacting Support failed.', error)
      );
  };

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

        <TextInput
          placeholder="Order ID"
          style={styles.inputField}
          onChangeText={(text) => setOrderId(text)}
        />

        <TextInput
          placeholder="Store ID"
          style={styles.inputField}
          onChangeText={(text) => setStoreId(text)}
        />

        <TextInput
          placeholder="Store Name"
          style={styles.inputField}
          onChangeText={(text) => setStoreName(text)}
        />
        <TextInput
          placeholder="Subject of Issue"
          style={styles.inputField}
          onChangeText={(text) => setSubject(text)}
        />
        <TextInput
          placeholder="Description"
          multiline
          style={styles.inputField}
          onChangeText={(text) => setDescription(text)}
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
              marginRight: 5,
              color: '#407BFF'
            }}
          >
            +
          </Text>
          <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
            Upload Image / Screenshot
          </Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={contactSupport}>
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
