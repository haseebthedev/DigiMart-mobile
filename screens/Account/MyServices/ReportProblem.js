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
import api from '../../../axios/api';
import Toast from 'react-native-toast-message';
import backIcon from '../../../assets/icons/backIcon.png';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import reportProblemImage from '../../../assets/images/reportProblemImage.png';
import { UserContext } from '../../../contexts/UserContext';

const ReportProblem = ({ navigation }) => {
  const { user } = UserContext();

  const [subject, SetSubject] = useState('');
  const [description, SetDescription] = useState('');

  const sendReport = async () => {
    await api
      .post(
        '/buyer/reportProblem',
        {
          subject,
          description,
          screenShot: ''
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
            SetSubject('');
            SetDescription('');
          }
        });
      })
      .catch((error) => console.log('ERROR: Reporting Problem failed.'));
  };

  return (
    <View style={styles.container}>
      <Toast ref={(ref) => Toast.setRef(ref)} />
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 30,
          zIndex: -1
        }}
      >
        REPORT A PROBLEM
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
            left: 20,
            zIndex: -1
          }}
        >
          <Image
            source={backIcon}
            style={{ width: 25, height: 25, tintColor: 'black' }}
          />
        </View>
      </TouchableNativeFeedback>

      <View style={{ marginTop: 30 }}>
        <View style={{ marginBottom: 50, alignItems: 'center' }}>
          <Image source={reportProblemImage} />
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text
            style={{
              fontSize: FONTS.subhead4,
              fontFamily: FONTS.Poppins
            }}
          >
            Share the details with us!
          </Text>
        </View>
        <TextInput
          placeholder="Subject"
          style={styles.inputField}
          onChangeText={(text) => SetSubject(text)}
          value={subject}
        />
        <TextInput
          placeholder="Description"
          multiline
          style={styles.inputField}
          onChangeText={(text) => SetDescription(text)}
          value={description}
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
        <TouchableOpacity style={styles.button} onPress={sendReport}>
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

export default ReportProblem;
