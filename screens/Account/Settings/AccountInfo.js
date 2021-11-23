import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { HelperText, TextInput, Button } from 'react-native-paper';
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

  const [IFerrors, setIFerrors] = useState({
    nameError: '',
    emailError: '',
    phoneNumberError: '',
    birthdayError: ''
  });

  const InputValidation = () => {
    const errors = {};
    var hasError = false;

    // name
    if (profileData.name.length > 2) {
      errors.nameError = '';
    } else {
      hasError = true;
      errors.nameError = 'Entered Name is invalid!';
    }

    // email
    var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (profileData.email.match(mailFormat)) {
      errors.emailError = '';
    } else {
      hasError = true;
      errors.emailError = 'Entered Email address is invalid!';
    }

    // phone
    var phoneFormat = /^(\+92)?[0-9]{10}$/;
    if (profileData.phoneNumber.match(phoneFormat)) {
      errors.phoneNumberError = '';
    } else {
      hasError = true;
      errors.phoneNumberError = 'Entered Phone Number is Invalid!';
    }

    // date of birth
    if (profileData.birthday.length >= 10) {
      errors.birthdayError = '';
    } else {
      hasError = true;
      errors.birthdayError = 'Entered Date of Birth is Invalid!';
    }

    setIFerrors({ ...IFerrors, ...errors });
    return hasError;
  };

  const cloudinaryUpload = (photo) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'ddyaz57o');

    fetch(`https://api.cloudinary.com/v1_1/dbsd56hgh/image/upload`, {
      method: 'post',
      body: data
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileData({ ...profileData, profilePic: data.secure_url });
      })
      .catch((e) => {
        console.log('An Error Occured While Uploading', e);
      });
  };

  const launchImageLibrary = () => {
    const options = {
      title: 'Select Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        const type = response.assets[0].type;
        const name = response.assets[0].fileName;
        const source = {
          uri,
          type,
          name
        };
        cloudinaryUpload(source);
      }
    });
  };

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
      .catch((e) => {
        ToastAndroid.show(
          `Error: ${e}`,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      });
  };

  const UpdateProfile = async () => {
    var errorExists = InputValidation();

    if (errorExists === false) {
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
          ToastAndroid.show(
            'Profile Updated Successfully!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
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

      {/* Profile Pic */}
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
        <TouchableOpacity
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
          onPress={launchImageLibrary}
        >
          <Image
            source={uploadIcon}
            style={{ width: 20, height: 20, tintColor: COLORS.PRIMARY }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 40, width: width - 40 }}>
        <TextInput
          label="Name"
          mode="outlined"
          onChangeText={(text) =>
            setProfileData({ ...profileData, name: text })
          }
          value={profileData.name}
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
          onChangeText={(text) =>
            setProfileData({ ...profileData, email: text })
          }
          value={profileData.email}
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
          label="Phone #"
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={(text) =>
            setProfileData({ ...profileData, phoneNumber: text })
          }
          value={profileData.phoneNumber}
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
          label="Date of Birth"
          mode="outlined"
          onChangeText={(text) =>
            setProfileData({ ...profileData, birthday: text })
          }
          value={profileData.birthday}
          style={styles.userInput}
        />
        <HelperText
          type="error"
          visible={IFerrors.birthdayError.length > 0 ? true : false}
          style={styles.errorText}
        >
          {IFerrors.birthdayError}
        </HelperText>
      </View>

      <Button
        mode="contained"
        style={{
          marginHorizontal: 20,
          paddingVertical: 5
        }}
        labelStyle={{ fontSize: FONTS.Paragraph1 }}
        onPress={UpdateProfile}
      >
        UPDATE PROFILE
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  userInput: { marginHorizontal: 10 },
  errorText: { marginHorizontal: 10, marginBottom: 0 }
});

export default AccountInfo;
