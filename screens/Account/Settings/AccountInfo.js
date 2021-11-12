import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
} from 'react-native';
import Toast from 'react-native-toast-message';
import api from '../../../axios/api';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import myImage from '../../../assets/images/imageNotAvailable.png';
import uploadIcon from '../../../assets/icons/uploadIcon.png';
import { UserContext } from '../../../contexts/UserContext';

const { width, height } = Dimensions.get('screen');

const AccountInfo = ({ navigation }) => {
  const { user } = UserContext();

  const [profileData, setProfileData] = useState({
    profilePic: null,
    name: '',
    email: '',
    phoneNumber: '',
    birthday: ''
  });

  const getUserInfo = async () => {
    await api
      .get('/buyer/me', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        const { profilePic, name, email, phoneNumber, birthday } =
          res.data.data.buyer[0];

        setProfileData({
          profilePic,
          name,
          email,
          phoneNumber,
          birthday
        });
      })
      .catch((e) => console.log('Error: Retriving User failed. ', e));
  };

  const UpdateProfile = async () => {
    await api
      .patch(
        '/buyer/me',
        {
          ...profileData
        },
        {
          headers: { Authorization: `Bearer ${user.token}` }
        }
      )
      .then(() => {
        Toast.show({
          type: 'success',
          text1: 'SUCCESS',
          text2: 'Profile Updated Successfully!',
          position: 'bottom'
        });
      })
      .catch((e) => {
        Toast.show({
          type: 'error',
          text1: 'Update Failed !',
          text2: e.toString(),
          position: 'bottom'
        });
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
          marginBottom: 40
        }}
      >
        Account Information
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

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center'
        }}
      >
        <Image
          source={
            profileData.profilePic != null
              ? { uri: profileData.profilePic }
              : myImage
          }
          style={{
            width: 120,
            height: 120,
            borderRadius: 80,
            borderWidth: 4,
            borderColor: '#fff'
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: 'white',
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2
          }}
        >
          <Image
            source={uploadIcon}
            style={{ width: 20, height: 20, tintColor: COLORS.PRIMARY }}
          />
        </View>
      </View>
      <View style={{ marginTop: 40, width: width - 40 }}>
        <TextInput
          placeholder="Name"
          style={styles.userInput}
          value={profileData.name}
          onChangeText={(text) =>
            setProfileData({ ...profileData, name: text })
          }
        />
        <TextInput
          placeholder="Email"
          style={styles.userInput}
          value={profileData.email}
          onChangeText={(text) =>
            setProfileData({ ...profileData, email: text })
          }
        />
        <TextInput
          placeholder="Phone #"
          style={styles.userInput}
          keyboardType="number-pad"
          value={profileData.phoneNumber}
          onChangeText={(text) =>
            setProfileData({ ...profileData, phoneNumber: text })
          }
        />
        <TextInput
          placeholder="Date of Birth"
          style={styles.userInput}
          value={profileData.birthday}
          onChangeText={(text) =>
            setProfileData({ ...profileData, birthday: text })
          }
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={UpdateProfile}>
        <Text style={styles.loginButton}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  userInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    marginBottom: 10,
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph2
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginTop: 20
  },
  loginButton: {
    fontSize: FONTS.Paragraph1,
    fontFamily: FONTS.PoppinsBold,
    color: '#fff'
  }
});

export default AccountInfo;
