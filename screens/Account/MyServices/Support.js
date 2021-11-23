import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  LogBox
} from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import api from '../../../axios/api';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import { UserContext } from '../../../contexts/UserContext';
import { HelperText, TextInput, Button } from 'react-native-paper';
import backIcon from '../../../assets/icons/backIcon.png';
import unFollowStoreIcon from '../../../assets/icons/unfollowStoreIcon.png';

const Support = ({ navigation }) => {
  LogBox.ignoreLogs(['EventEmitter.removeListener']);

  const { user } = UserContext();

  const [stores, setStores] = useState([]);
  const [storeId, setStoreId] = useState('6128c6ec00130918d0120ec4');
  const [orderId, setOrderId] = useState('DM-rTb2RrtJ');

  const [showDropDown, setShowDropDown] = useState(false);
  const [storeName, setStoreName] = useState('ABC Store');

  const [subject, setSubject] = useState('Late order Delivery');
  const [description, setDescription] = useState(
    'The order was delivered late'
  );
  const [screenShot, SetScreenShot] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [IFerrors, setIFerrors] = useState({
    orderIdError: '',
    storeNameError: '',
    subjectError: '',
    descriptionError: ''
  });

  const InputValidation = () => {
    const errors = {};
    var hasError = false;

    // Order id
    if (orderId.length > 0) {
      errors.orderIdError = '';
    } else {
      hasError = true;
      errors.orderIdError = 'Entered Order ID is invalid!';
    }

    // Store Name
    if (storeName.length > 0) {
      errors.storeNameError = '';
    } else {
      hasError = true;
      errors.storeNameError = 'Please Select a Store!';
    }

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

  const contactSupport = async () => {
    var errorExists = InputValidation();

    if (errorExists === false) {
      await api
        .post(
          '/buyer/problem/report/order',
          {
            storeID: storeId,
            orderID: orderId,
            storeName,
            subject,
            description,
            screenShot
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        )
        .then((res) => {
          ToastAndroid.show(
            'Your report has been sent!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );

          setStoreId('');
          setOrderId('');
          setStoreName('');
          setSubject('');
          setDescription('');
          SetScreenShot(null);
        })
        .catch((error) => {
          ToastAndroid.show(
            'Something went wrong!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
          console.log('Error: ', error);
        });
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontFamily: FONTS.PoppinsBold,
            fontSize: FONTS.subhead4,
            color: '#407BFF',
            marginTop: 20,
            textAlign: 'center',
            marginBottom: 30
          }}
        >
          SUPPORT
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

        <View style={{ marginTop: 20 }}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Text
              style={{
                fontSize: FONTS.subhead4,
                fontFamily: FONTS.Poppins
              }}
            >
              Any problem? Reach out to us!
            </Text>
          </View>

          <TextInput
            label="Order ID"
            mode="outlined"
            onChangeText={(text) => setOrderId(text)}
            value={orderId}
            style={styles.userInput}
          />
          <HelperText
            type="error"
            visible={IFerrors.orderIdError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.orderIdError}
          </HelperText>

          <SafeAreaView style={styles.userInput}>
            <DropDown
              label={'Store Name'}
              mode={'outlined'}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={storeName}
              setValue={setStoreName}
              list={[
                {
                  label: 'ABC Store',
                  value: 'AAA'
                },
                {
                  label: 'Google Inc.',
                  value: 'Google Inc.'
                },
                {
                  label: 'Apple Inc.',
                  value: 'Apple Inc.'
                }
              ]}
            />
          </SafeAreaView>
          <HelperText
            type="error"
            visible={IFerrors.storeNameError.length > 0 ? true : false}
            style={styles.errorText}
          >
            {IFerrors.storeNameError}
          </HelperText>

          <TextInput
            label="Subject of Issue"
            mode="outlined"
            style={styles.userInput}
            value={subject}
            onChangeText={(text) => setSubject(text)}
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
            multiline
            style={styles.userInput}
            value={description}
            onChangeText={(text) => setDescription(text)}
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
            onPress={contactSupport}
          >
            SEND
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },
  userInput: { marginHorizontal: 20 },
  errorText: { marginHorizontal: 20, marginBottom: 0 }
});

export default Support;
