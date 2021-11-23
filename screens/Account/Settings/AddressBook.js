import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { UserContext } from '../../../contexts/UserContext';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import editIcon from '../../../assets/icons/editIcon.png';
import directionIcon from '../../../assets/icons/directionIcon.png';
import api from '../../../axios/api';

const { width, height } = Dimensions.get('screen');

const AddressBook = ({ navigation }) => {
  const { user } = UserContext();
  const [ChangeAddressModal, setChangeAddressModal] = useState(false);
  const [AddressDetails, setAddressDetails] = useState({
    buyerId: '328072sfdgfydst40',
    address: 'LOADING...'
  });

  const getMyAddress = () => {
    api
      .get('/buyer/me', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        const { _id, address } = res.data.data.buyer[0];
        setAddressDetails({ buyerId: _id, address });
      })
      .catch((e) => console.log('Error: Retriving User failed. ', e));
  };

  const updateMyAddress = async () => {
    await api
      .patch(
        '/buyer/me',
        { address: AddressDetails.address },
        { headers: { Authorization: `Bearer ${user.token}` } }
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
    getMyAddress();
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
          marginBottom: 30
        }}
      >
        MY ADDRESS
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

      <LinearGradient
        colors={['#006BDA', '#2C88EA', '#407BFF']}
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          width: width - 40,
          paddingVertical: 20,
          justifyContent: 'center',
          borderRadius: 8
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 220 }}
        >
          <Image
            source={directionIcon}
            style={{
              width: 40,
              height: 40,
              tintColor: '#fff',
              marginRight: 20,
              marginLeft: 20
            }}
          />
          <View>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 14
              }}
            >
              {AddressDetails.address}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'flex-end'
        }}
      >
        {/* Edit Icon */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#407BFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginRight: 20
          }}
          onPress={() => setChangeAddressModal(true)}
        >
          <Image
            source={editIcon}
            style={{ width: 15, height: 15, tintColor: '#FFF' }}
          />
        </TouchableOpacity>
      </View>

      {/* Update Address Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={ChangeAddressModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: width * 0.8,
              padding: 30,
              elevation: 10,
              alignItems: 'center',
              borderRadius: 4
            }}
          >
            <Image
              source={directionIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: COLORS.PRIMARY,
                marginBottom: 30
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.Paragraph1,
                marginBottom: 10
              }}
            >
              Enter Address
            </Text>
            <TextInput
              placeholder="Your Address"
              style={{
                width: 240,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e1e1e1',
                marginHorizontal: 20,
                marginBottom: 10,
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph1,
                paddingTop: 15
              }}
              value={AddressDetails.address}
              onChangeText={(text) =>
                setAddressDetails({ ...AddressDetails, address: text })
              }
            />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setChangeAddressModal(false)}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 4,
                  marginLeft: 5
                }}
                onPress={() => {
                  updateMyAddress();
                  setChangeAddressModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2,
                    color: '#fff'
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AddressBook;
