import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';
import api from '../../axios/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import unfollowStoreIcon from '../../assets/icons/unfollowStoreIcon.png';
import productImage from '../../assets/images/laptop-image.png';
import backIcon from '../../assets/icons/backIcon.png';

const { width, height } = Dimensions.get('screen');

const StoresFollowed = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [selectedStore, setselectedStore] = useState();
  const [UnfollowStoreModal, setUnfollowStoreModal] = useState(false);
  const [storesList, setStoresList] = useState([]);

  const retriveUserToken = async () => {
    try {
      let value = await AsyncStorage.getItem('@USER_TOKEN');
      if (value !== null) {
        setToken(value);
        retriveFollowedStores();
      }
    } catch (e) {
      console.log('Error :: Retriving token failed :: ', e);
    }
  };

  const retriveFollowedStores = () => {
    AsyncStorage.getItem('@FOLLOW_STORES').then((value) => {
      if (value !== null) {
        setStoresList(JSON.parse(value));
      }
    });
  };

  // Unfollow Store from list
  const unfollowStore = async () => {
    let newArr = storesList.filter((el) => el._id !== selectedStore);
    setStoresList(newArr);
    await AsyncStorage.setItem('@FOLLOW_STORES', JSON.stringify(newArr));
    await api
      .patch(
        '/buyer/store/Unsubscribe',
        {
          storeId: selectedStore
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .catch((error) => console.log('ERROR:', error));
  };

  // Store Card
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          width: width - 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: 4,
          overflow: 'hidden'
        }}
        elevation={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Product Image */}
          <View style={{ padding: 10 }}>
            <Image
              source={productImage}
              style={{ width: 50, height: 50, margin: 8 }}
            />
          </View>

          {/* Product Details */}
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.Paragraph2
              }}
            >
              {item.name}
            </Text>
          </View>
        </View>

        {/* Delete Icon */}
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
          onPress={() => {
            setselectedStore(item._id);
            setUnfollowStoreModal(true);
          }}
        >
          <Image
            source={unfollowStoreIcon}
            style={{ width: 20, height: 20, tintColor: '#FFF' }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    retriveUserToken();
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
          marginBottom: 30
        }}
      >
        FOLLOWING STORES
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

      {/* Product List */}
      <FlatList
        data={storesList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

      {/* Delete Product Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={UnfollowStoreModal}
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
              alignItems: 'center'
            }}
          >
            <Image
              source={unfollowStoreIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: 'red',
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
              Are You Sure?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph2,
                textAlign: 'center',
                color: 'grey'
              }}
            >
              You will not receive future notifications from this store!
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setUnfollowStoreModal(false)}
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
                  backgroundColor: 'red',
                  borderRadius: 4,
                  marginLeft: 5
                }}
                onPress={() => {
                  unfollowStore();
                  setUnfollowStoreModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2,
                    color: '#fff'
                  }}
                >
                  Unfollow
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
    flex: 1,
    alignItems: 'center'
  }
});

export default StoresFollowed;
