import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import laptopImage from '../../assets/images/laptop-image.png';
import banner2 from '../../assets/images/banner2.png';

import addIcon from '../../assets/icons/addIcon.png';

const { width, height } = Dimensions.get('screen');

const Homepage = ({ navigation }) => {
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
    <View>
      <ScrollView>
        {/* PRODUCTS DEALS  */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            paddingHorizontal: 20
            // alignItems: 'center'
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Hot Deals
          </Text>
        </View>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, height: 195 }}
          >
            {ProductList.map((el, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.productCard,
                  { elevation: 1, flex: 1, height: 190 },
                  index !== ProductList.length - 1
                    ? { marginRight: 10 }
                    : { marginRight: 0 }
                ]}
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
          </ScrollView>
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
              borderRadius: 10,
              marginTop: 10
            }}
            resizeMode="contain"
          />
        </View>

        {/* Latest Products  */}
        <View
          style={{
            marginTop: 10,
            marginBottom: 10,
            paddingHorizontal: 20
            // alignItems: 'center'
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Latest Products
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, height: 195 }}
          >
            {ProductList.map((el, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.productCard,
                  { elevation: 1, flex: 1, height: 190 },
                  index !== ProductList.length - 1
                    ? { marginRight: 10 }
                    : { marginRight: 0 }
                ]}
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
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  productCard: {
    width: 155,
    // height: 190,
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

export default Homepage;
