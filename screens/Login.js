import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';
import { FONTS, COLORS, IMAGES } from '../constants/index';
import axios from 'axios';
import api from '../axios/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../contexts/UserContext';

const Login = ({ navigation }) => {
  const { ADD_USER } = UserContext();

  const [loginData, setLoginData] = useState({
    email: 'sheikh.ameen252@gmail.com',
    password: 'ameen321'
  });

  const handlerLogin = async () => {
    await api
      .post('/buyer/login', loginData)
      .then((res) => {
        // res => res.data.data.buyer
        // res => res.data.data.token
        Toast.show({
          type: 'success',
          text1: 'Login Successfully!',
          text2: 'Redirecting to Homepage...',
          onShow: () => {
            ADD_USER({ token: res.data.data.token, data: res.data.data.buyer });
          },
          onHide: () => {
            navigation.navigate('Layout');
          }
        });
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: 'Wrong Credentials',
          text2: 'Either email or password is invalid!'
        });
      });
  };

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View style={{ marginTop: 80, marginBottom: 50, alignItems: 'center' }}>
        <Image source={IMAGES.loginIllustration} style={styles.loginImage} />
      </View>
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text
          style={{
            fontSize: FONTS.subhead4,
            fontFamily: FONTS.Poppins
          }}
        >
          Login to your Account
        </Text>
      </View>
      <TextInput placeholder="Email" style={styles.inputField} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.inputField}
      />
      <TouchableOpacity style={styles.button} onPress={handlerLogin}>
        <Text style={styles.loginButton}>LOGIN</Text>
      </TouchableOpacity>

      <View
        style={{
          marginVertical: 20,
          alignItems: 'center'
        }}
      >
        <Text
          onPress={() => navigation.navigate('Register')}
          style={{
            fontSize: FONTS.Paragraph2,
            fontFamily: FONTS.Poppins,
            color: 'grey'
          }}
        >
          Don't have an account?{' '}
          <Text style={{ color: COLORS.PRIMARY }}>Sign Up</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loginImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: '#e1e1e1',
    borderColor: '#407BFF',
    borderWidth: 4,
    zIndex: -10
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
    fontSize: FONTS.Paragraph1,
    fontFamily: FONTS.Poppins,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Login;
