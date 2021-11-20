import React, { useState, useEffect } from 'react';
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
import api from '../../axios/api';

const { width, height } = Dimensions.get('screen');

const Homepage = ({ route, navigation }) => {
  const { storeId } = route.params;

  const [OnSaleProducts, SetOnSaleProducts] = useState([]);
  const [ForYouProducts, SetForYouProducts] = useState([]);

  function trimProdName(name) {
    let res = '';
    if (name.length > 14) {
      res = name.toString().substring(0, 13) + '...';
    } else {
      res = name;
    }
    return res;
  }

  useEffect(() => {
    api
      .get(`/buyer/data/store/${storeId}/mobile`)
      .then((res) => {
        let HotDeals = res.data.data.OnSaleProducts;
        let LatestProducts = res.data.data.ForYouProducts;
        SetOnSaleProducts(HotDeals);
        SetForYouProducts(LatestProducts);
      })
      .catch((error) => console.log('Error: ', error));
  }, []);

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
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {OnSaleProducts.map((el, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.productCard,
                  index !== OnSaleProducts.length - 1
                    ? { marginRight: 10 }
                    : { marginRight: 0 }
                ]}
                onPress={() =>
                  navigation.navigate('ProductPage', { prodId: el._id })
                }
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: el.images }}
                    style={{ width: 90, height: 90, marginVertical: 10 }}
                  />
                </View>
                <Text style={styles.productName}>{trimProdName(el.name)}</Text>
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
                    startingValue={el.avgRating}
                    imageSize={12}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: 10,
                      marginLeft: 4
                    }}
                  >
                    {'(' + el.totalRatingStars + ')'}
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
                  <Text style={styles.productPrice}>
                    {'Rs. ' + el.salePrice}
                  </Text>
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
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            For You
          </Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {ForYouProducts.map((el, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.productCard,
                  index !== ForYouProducts.length - 1
                    ? { marginRight: 10 }
                    : { marginRight: 0 }
                ]}
                onPress={() =>
                  navigation.navigate('ProductPage', { prodId: el._id })
                }
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: el.images }}
                    style={{ width: 90, height: 90, marginVertical: 10 }}
                  />
                </View>
                <Text style={styles.productName}>{trimProdName(el.name)}</Text>
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
                    startingValue={el.avgRating}
                    imageSize={12}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: 10,
                      marginLeft: 4
                    }}
                  >
                    {'(' + el.totalRatingStars + ')'}
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
                  <Text style={styles.productPrice}>
                    {'Rs. ' + el.salePrice}
                  </Text>
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
