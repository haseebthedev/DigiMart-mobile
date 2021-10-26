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
  FlatList,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import api from '../../axios/api';
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import backIcon from '../../assets/icons/backIcon.png';

const { width, height } = Dimensions.get('screen');

const AllCategories = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [productCategories, setProductCategories] = useState([]);

  const retriveToken = () => {
    try {
      AsyncStorage.getItem('@USER_TOKEN').then((value) => {
        if (value !== null) {
          setToken(value);
        }
      });
    } catch (e) {
      console.log('Error :: Retriving token failed :: ', e);
    }
  };

  const getAllCategories = async () => {
    await api
      .get('/buyer/product/categories', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        const categoryList = res.data.data.categories.map(
          (el) => el.mainCategoryName
        );
        setProductCategories(categoryList);
      })
      .catch((error) => console.log('Error: ' + error));
  };

  useEffect(() => {
    retriveToken();
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [token]);

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
        CATEGORIES
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

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        {productCategories.map((el, index) => {
          return (
            <TouchableOpacity key={index}>
              <View
                style={{
                  paddingVertical: 20,
                  paddingHorizontal: 20,
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Text style={{ fontFamily: FONTS.Poppins }}>{el}</Text>
                <Image
                  source={backIcon}
                  style={{
                    width: 15,
                    height: 15,
                    transform: [{ rotate: '180deg' }]
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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

export default AllCategories;
