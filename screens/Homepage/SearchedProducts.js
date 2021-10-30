import React, { useState, useEffect } from 'react';
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
import { Rating } from 'react-native-ratings';
import { FONTS } from '../../constants/index';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import addIcon from '../../assets/icons/addIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
import Toast from 'react-native-toast-message';

// Calculate margin for product cards
function ApplyMargin(index) {
  let margin = { marginRight: 0, marginBottom: 0 };
  margin =
    index % 2 === 0
      ? { marginRight: 5, marginBottom: 10 }
      : { marginLeft: 5, marginBottom: 10 };
  return margin;
}

function trimProdName(name) {
  let res = '';
  if (name.length > 14) {
    res = name.toString().substring(0, 13) + '...';
  } else {
    res = name;
  }
  return res;
}

const SearchedProducts = ({ route, navigation }) => {
  const { type, params } = route.params;

  const [Heading, setHeading] = useState('');
  const [ProductList, setProductList] = useState([]);

  const getProducts = async () => {
    let reqURL = '';

    if (type === 'subCategory') {
      reqURL = `/buyer/products/subCategory/${params}`;
      setHeading('Searched term: ' + params);
    } else if (type === 'topSelling') {
      reqURL = '/buyer/products/onSale';
      setHeading('Searched term: Top Selling');
    } else if (type === 'topReviewed') {
      reqURL = '/buyer/products/topReviewed';
      setHeading('Searched term: Top Rated');
    } else if (type === 'newArrival') {
      reqURL = '/buyer/products/newArrival';
      setHeading('Searched term: New Arrival');
    } else if (type === 'lowCost') {
      reqURL = '/buyer/products';
      setHeading('Searched term: Low Cost');
    } else if (type === 'Category') {
      reqURL = `/buyer/products/category/${params}`;
      setHeading('Searched term: ' + params);
    }

    await api
      .get(reqURL)
      .then((res) => {
        let products = res.data.data.products;
        if (type === 'lowCost') {
          products.sort((a, b) => a.salePrice - b.salePrice);
        }
        if (type === 'newArrival') {
          products.sort((a, b) => {
            var dateA = new Date(a.createdAt),
              dateB = new Date(b.createdAt);
            return dateB - dateA;
          });
        }
        setProductList(products);
      })
      .catch((error) => console.log('ERROR :: ', error));
  };

  useEffect(() => {
    getProducts();
  }, []);

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
          {Heading}
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
        {ProductList.length > 0 &&
          ProductList.map((el, index) => (
            <TouchableOpacity
              key={el._id}
              style={[styles.productCard, ApplyMargin(index)]}
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
                <Text style={styles.productPrice}>{'Rs. ' + el.salePrice}</Text>
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
