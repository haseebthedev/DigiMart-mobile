import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {FONTS, COLORS} from '../constants/index';

const Register = ({navigation}) => {
  return (
    <ScrollView scrollEnabled style={styles.container}>
      <View>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 35,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FONTS.subhead2,
              fontFamily: FONTS.Poppins,
              color: COLORS.PRIMARY,
            }}>
            Create Your Account
          </Text>
          <Text
            style={{
              fontSize: FONTS.Paragraph3,
              fontFamily: FONTS.Poppins,
            }}>
            Please enter info to create your account
          </Text>
        </View>
        <View>
          <TextInput placeholder="Name" style={styles.userInput} />
          <TextInput placeholder="Email" style={styles.userInput} />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.userInput}
          />

          <View
            style={{
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e1e1e1',
              marginHorizontal: 20,
              marginBottom: 10,
            }}>
            <Picker
              style={{color: 'grey'}}
              selectedValue={'Select your Gender'}
              onValueChange={(itemValue, itemIndex) => console.log('changed')}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>

          <TextInput
            placeholder="Phone Number"
            textContentType="telephoneNumber"
            style={styles.userInput}
          />

          <TextInput placeholder="City" style={styles.userInput} />
          <TextInput placeholder="Address" style={styles.userInput} />

          <View style={styles.button}>
            <Text style={styles.loginButton}>REGISTER</Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: FONTS.Paragraph2,
              fontFamily: FONTS.Poppins,
              color: 'grey',
            }}
            onPress={() => navigation.navigate('Login')}>
            Already have an account?{' '}
            <Text style={{color: COLORS.PRIMARY}}>Login Here</Text>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: FONTS.Paragraph2,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 20,
  },
  loginButton: {
    fontSize: FONTS.Paragraph1,
    fontFamily: FONTS.Poppins,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Register;
