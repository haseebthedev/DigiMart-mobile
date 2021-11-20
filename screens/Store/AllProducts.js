import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { FONTS } from '../../constants/index';
import addIcon from '../../assets/icons/addIcon.png';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import api from '../../axios/api';

const AllProducts = ({ route, navigation }) => {
  const { storeId } = route.params;

  const [ProductList, setProductList] = useState([]);

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
      .get(`/buyer/products/store/${storeId}`)
      .then((res) => {
        let products = res.data.data.products;
        setProductList(products);
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
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            All Products
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
                      source={
                        el.images ? { uri: el.images } : imageNotAvailable
                      }
                      style={{ width: 90, height: 90, marginVertical: 10 }}
                    />
                  </View>
                  <Text style={styles.productName}>
                    {trimProdName(el.name)}
                  </Text>
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
                </View>
              </View>
            );
          })}
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

export default AllProducts;
