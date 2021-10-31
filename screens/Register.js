import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Picker } from '@react-native-picker/picker';
import { FONTS, COLORS } from '../constants/index';
import api from '../axios/api';

const Register = ({ navigation }) => {
  const [name, setName] = useState('tehseenriaz');
  const [email, setEmail] = useState('tehseenriaz@gmail.com');
  const [gender, setGender] = useState('male');
  const [birthday, setBirthday] = useState('01/01/2000');
  const [address, setAddress] = useState('House # 328, Satellite Town');
  const [city, setCity] = useState('Islamabad');
  const [phoneNumber, setPhoneNumber] = useState('+923455488909');
  const [password, setPassword] = useState('tehseen123');

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
        Toast.show({
          type: 'success',
          text1: 'Registration Successfully!',
          text2: 'Redirecting to Login page...',
          onHide: () => {
            navigation.navigate('Login');
          }
        });
      })
      .catch((e) => {
        console.log('ERROR: ' + e);
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
            placeholder="Name"
            style={styles.userInput}
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            placeholder="Email"
            style={styles.userInput}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.userInput}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e1e1e1',
              marginHorizontal: 20,
              marginBottom: 10
            }}
          >
            <Picker
              style={{ color: 'rgb(169,169,169)' }}
              selectedValue={'Select your Gender'}
              onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
            >
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>

          <TextInput
            placeholder="Phone Number"
            textContentType="telephoneNumber"
            style={styles.userInput}
            onChangeText={(text) => setPhoneNumber(text)}
            value={phoneNumber}
          />

          <TextInput
            placeholder="City"
            style={styles.userInput}
            onChangeText={(text) => setCity(text)}
            value={city}
          />
          <TextInput
            placeholder="Address"
            style={styles.userInput}
            onChangeText={(text) => setAddress(text)}
            value={address}
          />

          <TouchableOpacity style={styles.button} onPress={handlerRegister}>
            <Text style={styles.loginButton}>REGISTER</Text>
          </TouchableOpacity>
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
