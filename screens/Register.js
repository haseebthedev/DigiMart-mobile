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
import { HelperText, TextInput, Button } from 'react-native-paper';
import { FONTS, COLORS } from '../constants/index';
import api from '../axios/api';

const Register = ({ navigation }) => {
  LogBox.ignoreAllLogs(); //Ignore all warning log notifications

  const [name, setName] = useState('tehseenriaz');
  const [email, setEmail] = useState('tehseenriaz@gmail.com');
  const [password, setPassword] = useState('tehseen123');
  const [gender, setGender] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+923455488909');
  const [birthday, setBirthday] = useState('01/01/2000');
  const [city, setCity] = useState('Islamabad');
  const [address, setAddress] = useState('House # 328, Satellite Town');

  const [IFerrors, setIFerrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    genderError: '',
    phoneNumberError: '',
    cityError: '',
    addressError: ''
  });

  const InputValidation = () => {
    const errors = {};
    var hasError = false;

    // name
    var noNumber = /^([^0-9]*)$/;
    if (name.match(noNumber) && name.length > 0) {
      errors.nameError = '';
    } else {
      hasError = true;
      errors.nameError = 'Entered Name is invalid!';
    }

    // email
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) {
      errors.emailError = '';
    } else {
      hasError = true;
      errors.emailError = 'Entered Email address is invalid!';
    }

    // gender
    if (gender.length > 0) {
      errors.genderError = '';
    } else {
      hasError = true;
      errors.genderError = 'Select your Gender!';
    }

    // phone
    var phoneFormat = /^(\+92)?[0-9]{10}$/;
    if (phoneNumber.match(phoneFormat)) {
      errors.phoneNumberError = '';
    } else {
      hasError = true;
      errors.phoneNumberError = 'Entered Phone Number is Invalid!';
    }

    // password
    var passwordFormat = /^[A-Za-z0-9].{7,}$/;
    if (password.match(passwordFormat)) {
      errors.passwordError = '';
    } else {
      hasError = true;
      errors.passwordError = 'Enter atleast 8 characters of Password!';
    }

    // city
    if (city.length > 0) {
      errors.cityError = '';
    } else {
      hasError = true;
      errors.cityError = 'Enter a valid City!';
    }

    // address
    var addressFormat = /^[a-zA-Z0-9-@#{1},\s]*$/;
    if (address.match(addressFormat) && address.length > 10) {
      errors.addressError = '';
    } else {
      hasError = true;
      errors.addressError = 'Entered Address is Invalid!';
    }

    setIFerrors({ ...IFerrors, ...errors });
    return hasError;
  };

  const handlerRegister = async () => {
    var errorExists = InputValidation();

    if (errorExists === false) {
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
    }
  };

  return (
    <ScrollView scrollEnabled style={styles.container}>
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
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.nameError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.nameError}
          </HelperText>

          <TextInput
            label="Email"
            mode="outlined"
            onChangeText={(text) => setEmail(text)}
            value={email}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.emailError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.emailError}
          </HelperText>

          <TextInput
            label="Password"
            mode="outlined"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.passwordError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.passwordError}
          </HelperText>

          <SafeAreaView style={styles.userInput}>
            <DropDown
              label={'Gender'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={gender}
              setValue={setGender}
              list={[
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
              ]}
            />
          </SafeAreaView>
          <HelperText
            type="error"
            visible={IFerrors.genderError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.genderError}
          </HelperText>

          <TextInput
            label="Phone Number"
            mode="outlined"
            textContentType="telephoneNumber"
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.phoneNumberError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.phoneNumberError}
          </HelperText>

          <TextInput
            label="City"
            mode="outlined"
            onChangeText={(text) => setCity(text)}
            value={city}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.cityError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.cityError}
          </HelperText>

          <TextInput
            label="Address"
            mode="outlined"
            onChangeText={(text) => setAddress(text)}
            value={address}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.addressError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.addressError}
          </HelperText>

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
  userInput: { marginHorizontal: 20 },
  errorText: { marginHorizontal: 20, marginBottom: 0 }
});

export default Register;
