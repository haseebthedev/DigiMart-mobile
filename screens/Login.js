import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ToastAndroid } from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
import { FONTS, COLORS, IMAGES } from '../constants/index';
import api from '../axios/api';
import { UserContext } from '../contexts/UserContext';

const Login = ({ navigation }) => {
  const { ADD_USER } = UserContext();
  const [LoginEmail, setLoginEmail] = useState('sheikh.ameen252@gmail.com');
  const [LoginPass, setLoginPass] = useState('ameen321');
  const [Loading, setLoading] = useState(false);

  const [IFerrors, setIFerrors] = useState({
    LoginEmailError: ''
  });

  const InputValidation = () => {
    const errors = {};
    var hasError = false;

    // email
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (LoginEmail.match(mailFormat)) {
      errors.LoginEmailError = '';
    } else {
      hasError = true;
      errors.LoginEmailError = 'Entered Email address is invalid!';
    }

    setIFerrors({ ...IFerrors, ...errors });
    return hasError;
  };

  const handlerLogin = async () => {
    var errorExists = InputValidation();

    if (errorExists === false) {
      setLoading(true);

      await api
        .post('/buyer/login', { email: LoginEmail, password: LoginPass })
        .then((res) => {
          ToastAndroid.show(
            'Login Success! Redirecting to Homepage',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          ADD_USER(res.data.data.buyer._id, res.data.data.token);
          navigation.navigate('Layout');
        })
        .catch((error) => {
          ToastAndroid.show(
            'Either email or password is invalid!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 80, marginBottom: 30, alignItems: 'center' }}>
        <Image source={IMAGES.loginIllustration} style={styles.loginImage} />
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text
          style={{
            fontSize: FONTS.subhead4,
            fontFamily: FONTS.Poppins
          }}
        >
          Login to your Account
        </Text>
      </View>

      <TextInput
        label="Email"
        mode="outlined"
        onChangeText={(text) => setLoginEmail(text)}
        value={LoginEmail}
        style={{
          marginHorizontal: 20
        }}
      />
      <HelperText
        type="error"
        visible={IFerrors.LoginEmailError.length > 0 ? true : false}
        style={{ marginHorizontal: 20, marginBottom: 10 }}
      >
        {IFerrors.LoginEmailError}
      </HelperText>

      <TextInput
        label="Password"
        secureTextEntry
        mode="outlined"
        style={{ marginHorizontal: 20, marginBottom: 30 }}
        onChangeText={(text) => setLoginPass(text)}
        value={LoginPass}
      />

      <Button
        icon="login"
        mode="contained"
        loading={Loading}
        style={{
          marginHorizontal: 20,
          paddingVertical: 5
        }}
        labelStyle={{ fontSize: FONTS.Paragraph1 }}
        disabled={Loading}
        onPress={handlerLogin}
      >
        LOGIN
      </Button>

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
  }
});

export default Login;
