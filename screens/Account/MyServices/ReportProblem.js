import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ToastAndroid,
  LogBox
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { HelperText, TextInput, Button } from 'react-native-paper';
import api from '../../../axios/api';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import { UserContext } from '../../../contexts/UserContext';

// images
import backIcon from '../../../assets/icons/backIcon.png';
import unFollowStoreIcon from '../../../assets/icons/unfollowStoreIcon.png';
import reportProblemImage from '../../../assets/images/reportProblemImage.png';

const ReportProblem = ({ navigation }) => {
  LogBox.ignoreAllLogs(); //Ignore all warning log notifications

  const { user } = UserContext();

  const [subject, SetSubject] = useState('');
  const [description, SetDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [screenShot, SetScreenShot] = useState(null);

  const [IFerrors, setIFerrors] = useState({
    subjectError: '',
    descriptionError: ''
  });

  const InputValidation = () => {
    const errors = {};
    var hasError = false;

    // Subject
    if (subject.length > 0) {
      errors.subjectError = '';
    } else {
      hasError = true;
      errors.subjectError = 'Please enter a valid Subject!';
    }

    // Description
    if (description.length > 0) {
      errors.descriptionError = '';
    } else {
      hasError = true;
      errors.descriptionError = 'Please enter a valid Description!';
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
        SetScreenShot(data.secure_url);
        setIsUploading(false);
      })
      .catch((e) => {
        console.log('An Error Occured While Uploading', e);
        setIsUploading(false);
      });
  };

  const launchImageLibrary = () => {
    setIsUploading(true);

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

  const sendReport = async () => {
    var errorExists = InputValidation();

    if (errorExists === false) {
      await api
        .post(
          '/buyer/reportProblem',
          {
            subject,
            description,
            screenShot
          },
          {
            headers: { Authorization: `Bearer ${user.token}` }
          }
        )
        .then((res) => {
          ToastAndroid.show(
            'Your report has been sent!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );

          SetSubject('');
          SetDescription('');
          SetScreenShot(null);
        })
        .catch((error) => {
          ToastAndroid.show(
            'Something went wrong!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        });
    }
  };

  return (
    <View style={styles.container}>
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
          label="Subject"
          mode="outlined"
          onChangeText={(text) => SetSubject(text)}
          value={subject}
          style={styles.userInput}
        />
        <HelperText
          type="error"
          visible={IFerrors.subjectError.length > 0 ? true : false}
          style={styles.errorText}
        >
          {IFerrors.subjectError}
        </HelperText>

        <TextInput
          label="Description"
          mode="outlined"
          onChangeText={(text) => SetDescription(text)}
          value={description}
          style={styles.userInput}
        />
        <HelperText
          type="error"
          visible={IFerrors.descriptionError.length > 0 ? true : false}
          style={styles.errorText}
        >
          {IFerrors.descriptionError}
        </HelperText>

        <Button
          icon="plus"
          mode="outlined"
          disabled={isUploading}
          style={{
            marginHorizontal: 20,
            paddingVertical: 5,
            marginTop: 5,
            marginBottom: 20
          }}
          onPress={launchImageLibrary}
        >
          Upload Image
        </Button>

        {
          <View style={{ marginHorizontal: 20, alignItems: 'center' }}>
            {screenShot !== null ? (
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: screenShot }}
                  style={{
                    width: 60,
                    height: 60,
                    marginBottom: 5,
                    borderWidth: 2,
                    borderColor: '#e1e1e1'
                  }}
                />
                <TouchableOpacity onPress={() => SetScreenShot(null)}>
                  <Image
                    source={unFollowStoreIcon}
                    style={{
                      width: 20,
                      height: 20,
                      marginBottom: 20
                    }}
                    tintColor="grey"
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        }

        <Button
          icon="send"
          mode="contained"
          style={{
            marginHorizontal: 20,
            paddingVertical: 5
          }}
          labelStyle={{
            fontSize: FONTS.Paragraph1
          }}
          onPress={sendReport}
        >
          SEND
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userInput: { marginHorizontal: 20 },
  errorText: { marginHorizontal: 20, marginBottom: 0 }
});

export default ReportProblem;
