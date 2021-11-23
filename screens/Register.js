import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  LogBox,
  SafeAreaView,
  ToastAndroid
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { FONTS, COLORS } from '../constants/index';
import api from '../axios/api';

const Register = ({ navigation }) => {
  LogBox.ignoreAllLogs(); //Ignore all warning log notifications

  const [name, setName] = useState('tehseenriaz');
  const [email, setEmail] = useState('tehseenriaz@gmail.com');
  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('01/01/2000');
  const [address, setAddress] = useState('House # 328, Satellite Town');
  const [city, setCity] = useState('Islamabad');
  const [phoneNumber, setPhoneNumber] = useState('+923455488909');
  const [password, setPassword] = useState('tehseen123');

  const genderList = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    },
    {
      label: 'Others',
      value: 'others'
    }
  ];

  const handlerRegister = async () => {
    await api
      .post('/buyer/register', {
        name,
        email,
        gender,
        birthday,
        address,
        city,
        phoneNumber,
        password
      })
      .then((res) => {
        ToastAndroid.show(
          'Registered Successfully! Redirecting to Login Page!',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
        navigation.navigate('Login');
      })
      .catch((e) => {
        ToastAndroid.show(
          `Error: ${e}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  return (
    <ScrollView scrollEnabled style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <View>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 35,
            alignItems: 'center',
            zIndex: -1
          }}
        >
          <Text
            style={{
              fontSize: FONTS.subhead2,
              fontFamily: FONTS.Poppins,
              color: COLORS.PRIMARY
            }}
          >
            Create Your Account
          </Text>
          <Text
            style={{
              fontSize: FONTS.Paragraph3,
              fontFamily: FONTS.Poppins
            }}
          >
            Please enter info to create your account
          </Text>
        </View>
        <View>
          <TextInput
            label="Name"
            mode="outlined"
            onChangeText={(text) => setName(text)}
            value={name}
            style={{ marginHorizontal: 20, marginBottom: 20 }}
          />

          <TextInput
            label="Email"
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={{ marginHorizontal: 20, marginBottom: 20 }}
          />

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={{ marginHorizontal: 20, marginBottom: 20 }}
          />

          <SafeAreaView style={{ marginHorizontal: 20, marginBottom: 20 }}>
            <DropDown
              label={'Gender'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={genderList}
            />
          </SafeAreaView>

          <TextInput
            label="Phone Number"
            mode="outlined"
            textContentType="telephoneNumber"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={{ marginHorizontal: 20, marginBottom: 20 }}
          />

          <TextInput
            label="City"
            mode="outlined"
            onChangeText={(text) => setCity(text)}
            value={city}
            style={{ marginHorizontal: 20, marginBottom: 20 }}
          />

          <TextInput
            label="Address"
            mode="outlined"
            onChangeText={(text) => setAddress(text)}
            value={address}
            style={{ marginHorizontal: 20, marginBottom: 30 }}
          />

          <Button
            mode="contained"
            style={{
              marginHorizontal: 20,
              paddingVertical: 5
            }}
            labelStyle={{ fontSize: FONTS.Paragraph1 }}
            onPress={handlerRegister}
          >
            REGISTER
          </Button>
        </View>
        <View
          style={{
            marginVertical: 20,
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              fontSize: FONTS.Paragraph2,
              fontFamily: FONTS.Poppins,
              color: 'grey'
            }}
            onPress={() => navigation.navigate('Login')}
          >
            Already have an account?{' '}
            <Text style={{ color: COLORS.PRIMARY }}>Login Here</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  userInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginHorizontal: 20,
    marginBottom: 10,
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph2
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20
  },
  loginButton: {
    fontSize: FONTS.Paragraph1,
    fontFamily: FONTS.Poppins,
    color: '#fff',
    fontWeight: 'bold'
  }
});

export default Register;
