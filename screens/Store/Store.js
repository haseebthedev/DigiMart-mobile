import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import backIcon from '../../assets/icons/backIcon.png';
import storeImage from '../../assets/images/seller-logo.png';
import laptopImage from '../../assets/images/laptop-image.png';
import banner2 from '../../assets/images/banner2.png';

import addIcon from '../../assets/icons/addIcon.png';

const { width, height } = Dimensions.get('screen');

// Calculate margin for product cards
function ApplyMargin(index) {
  let margin = { marginRight: 0, marginBottom: 0 };
  margin =
    index % 2 === 0
      ? { marginRight: 5, marginBottom: 10 }
      : { marginLeft: 5, marginBottom: 10 };
  return margin;
}

function StoreHomepage({ navigation }) {
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* PRODUCTS DEALS  */}
      <View
        style={{
          marginVertical: 20,
          paddingHorizontal: 20,
          alignItems: 'center'
        }}
      >
        <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
          Hot Deals
        </Text>
      </View>

      {/* Product List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        {ProductList.map((el, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.productCard,
              index !== ProductList.length - 1
                ? { marginRight: 10 }
                : { marginRight: 0 }
            ]}
            onPress={() => navigation.navigate('ProductPage')}
          >
            <View style={{ alignItems: 'center' }}>
              <Image source={laptopImage} style={{ width: 110, height: 110 }} />
            </View>
            <Text style={styles.productName}>{el.name}</Text>
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
                startingValue={el.ratings}
                imageSize={12}
              />
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 10,
                  marginLeft: 4
                }}
              >
                {'(' + el.ratings + ')'}
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
              <Text style={styles.productPrice}>{'Rs. ' + el.price}</Text>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function StoreAllProducts({ navigation }) {
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
    <View style={{ flex: 1 }}>
      {/* PRODUCTS DEALS  */}
      <View>
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Newly Added
          </Text>
        </View>

        {/* Newly Added Product List */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {ProductList.map((el, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.productCard, ApplyMargin(index)]}
                onPress={() => navigation.navigate('ProductPage')}
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={laptopImage}
                    style={{ width: 110, height: 110 }}
                  />
                </View>
                <Text style={styles.productName}>{el.name}</Text>
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
                    startingValue={el.ratings}
                    imageSize={12}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: 10,
                      marginLeft: 4
                    }}
                  >
                    {'(' + el.ratings + ')'}
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
                  <Text style={styles.productPrice}>{'Rs. ' + el.price}</Text>
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
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const Store = ({ navigation }) => {
  return (
    <React.Fragment>
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
        STORE
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

      {/* Store Image and Name */}
      <View
        style={{
          width: width - 40,
          borderRadius: 20,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          source={storeImage}
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#fff',
            borderRadius: 40
          }}
        />
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Google Inc.
          </Text>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 12,
                marginRight: 10
              }}
            >
              165 Products
            </Text>
            <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
              5302 Followers
            </Text>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#e1e1e1',
              justifyContent: 'center',
              alignItems: 'center',
              width: 80,
              paddingHorizontal: 4,
              borderRadius: 4,
              marginTop: 10
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 13,
                color: 'grey'
              }}
            >
              FOLLOW
            </Text>
          </View>
        </View>
      </View>

      {/* Image Banner */}
      <View
        style={{
          paddingHorizontal: 20
        }}
      >
        <Image
          source={banner2}
          style={{
            width: width - 40,
            height: (width * 377) / 870,
            borderRadius: 10
          }}
          resizeMode="contain"
        />
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: FONTS.Poppins }
        }}
      >
        <Tab.Screen name="Home page" component={StoreHomepage} />
        <Tab.Screen name="All Products" component={StoreAllProducts} />
      </Tab.Navigator>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  productCard: {
    width: 155,
    height: 190,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 1
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

export default Store;
