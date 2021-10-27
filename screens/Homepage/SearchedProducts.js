import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import api from '../../axios/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import { FONTS } from '../../constants/index';
import laptopImage from '../../assets/images/laptop-image.png';
import addIcon from '../../assets/icons/addIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
import Toast from 'react-native-toast-message';

const SearchedProducts = ({ route, navigation }) => {
  const { type } = route.params;

  const [ProductList] = useState([
    {
      id: 1,
      name: 'HP Laptop 15',
      price: '100',
      colors: '2 Colors',
      ratings: 4.6,
      image: require('../../assets/images/laptop-image.png')
    },
    {
      id: 2,
      name: 'HP Laptop',
      price: '230',
      colors: '5 Colors',
      ratings: 2,
      image: require('../../assets/images/laptop-image.png')
    },
    {
      id: 3,
      name: 'HP Laptop',
      price: '340',
      colors: '12 Colors',
      ratings: 5,
      image: require('../../assets/images/laptop-image.png')
    },
    {
      id: 4,
      name: 'HP Laptop',
      price: '500',
      colors: '9 Colors',
      ratings: 4,
      image: require('../../assets/images/laptop-image.png')
    },
    {
      id: 5,
      name: 'HP Laptop',
      price: '6000',
      colors: '4 Colors',
      ratings: 3.5,
      image: require('../../assets/images/laptop-image.png')
    },
    {
      id: 6,
      name: 'HP Laptop',
      price: '2300',
      colors: '12 Colors',
      ratings: 2,
      image: require('../../assets/images/laptop-image.png')
    }
  ]);

  return (
    <ScrollView>
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
        PRODUCTS
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

      {/* PRODUCTS DEALS  */}
      <View
        style={{
          marginBottom: 10,
          paddingHorizontal: 20
        }}
      >
        <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 14 }}>
          Products: {type}
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          marginBottom: 20
        }}
      >
        {ProductList.map((el, index) => {
          return (
            <View
              style={{
                width: '48%',
                height: 200
              }}
              key={index}
            >
              <View
                style={{
                  height: 190,
                  elevation: 1,
                  paddingHorizontal: 10,
                  backgroundColor: '#fff',
                  borderRadius: 6
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={laptopImage}
                    style={{ width: 110, height: 110 }}
                  />
                </View>
                <Text style={styles.productName}>HP Laptip</Text>
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row'
                  }}
                >
                  <Rating
                    readonly={true}
                    ratingColor="#3498db"
                    ratingBackgroundColor="#c8c7c8"
                    startingValue={3}
                    imageSize={12}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: 10,
                      marginLeft: 4
                    }}
                  >
                    {'(' + '235' + ')'}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: 10
                  }}
                >
                  <Text style={styles.productPrice}>{'Rs. ' + '145'}</Text>
                  <TouchableOpacity>
                    <Image
                      source={addIcon}
                      style={{
                        width: 30,
                        height: 30,
                        tintColor: '#407BFF'
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  productCard: {
    width: 155,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  productName: {
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph2
  },
  productColors: {
    color: '#fff',
    fontSize: FONTS.Paragraph4
  },
  productPrice: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONTS.Paragraph2
  }
});

export default SearchedProducts;
