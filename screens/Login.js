import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../constants/index';
import axios from 'axios';
import api from '../axios/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    email: 'sheikh.ameen252@gmail.com',
    password: 'ameen321'
  });

  const handlerLogin = async () => {
    // await api
    //   .post('/buyer/login', loginData)
    //   .then((res) => console.log(res.data.data))
    //   .catch((error) => console.log('error', error));
    // await AsyncStorage.setItem('USER_DATA', res.data.data.token);
    navigation.navigate('Layout');
  };

  return (
    <View style={styles.container}>
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
    borderWidth: 4
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
