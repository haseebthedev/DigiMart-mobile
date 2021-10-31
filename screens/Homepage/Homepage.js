import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../axios/api';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';
import { FONTS, COLORS, IMAGES } from '../../constants/index';

// Icons
import categoryIcon from '../../assets/icons/categoriesIcon.png';
import topSellingIcon from '../../assets/icons/topSellingIcon.png';
import topRatedIcon from '../../assets/icons/topRatedIcon.png';
import newAddedIcon from '../../assets/icons/newAddedIcon.png';
import cheapIcon from '../../assets/icons/cheapIcon.png';
import techIcon from '../../assets/icons/techIcon.png';
import musicDevicesIcon from '../../assets/icons/musicDevicesIcon.png';
import fashionIcon from '../../assets/icons/fashionIcon.png';
import sportsIcon from '../../assets/icons/sportsIcon.png';
import homeAppliencesIcon from '../../assets/icons/homeAppliencesIcon.png';
import addIcon from '../../assets/icons/addIcon.png';

// Images
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import banner2 from '../../assets/images/banner2.png';

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

const { width, height } = Dimensions.get('window');

const Homepage = ({ navigation }) => {
  const [BannerImages, setBannerImages] = useState([
    'https://source.unsplash.com/1024x768/?laptop',
    'https://source.unsplash.com/1024x768/?mobile',
    'https://source.unsplash.com/1024x768/?technology',
    'https://source.unsplash.com/1024x768/?macbook',
    'https://source.unsplash.com/1024x768/?engineer',
    'https://source.unsplash.com/1024x768/?ecommerce'
  ]);
  const [ProductsOnSale, setProductsOnSale] = useState([]);
  const [TopReviewedProducts, setTopReviewedProducts] = useState([]);

  const retriveProducts = async () => {
    await api
      .get('/')
      .then((res) => {
        setProductsOnSale(res.data.data.ProductsOnSale);
        setTopReviewedProducts(res.data.data.TopReviewedProducts);
      })
      .catch((error) =>
        console.log('ERROR: ' + JSON.stringify(error.response.data.error))
      );
  };

  useEffect(() => {
    retriveProducts();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          marginVertical: 10,
          paddingHorizontal: 20
        }}
      >
        <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 30 }}>
          Discover Now
        </Text>
      </View>

      {/* Image Slider */}
      <View>
        <SliderBox
          images={BannerImages}
          sliderBoxHeight={140}
          dotColor="#FFF"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 8,
            height: 8
          }}
          ImageComponentStyle={{ borderRadius: 8, width: '90%' }}
          paginationBoxVerticalPadding={8}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />
      </View>

      {/* 1. UNDER BANNER */}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() => navigation.navigate('AllCategories')}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={categoryIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Categories
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SearchedProducts', { type: 'topSelling' })
          }
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={topSellingIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Top Selling
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', { type: 'topReviewed' })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={topRatedIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Top Rated
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', { type: 'newArrival' })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={newAddedIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            New Arrival
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', { type: 'lowCost' })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={cheapIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Low Cost
          </Text>
        </TouchableOpacity>
      </View>

      {/* 2. UNDER BANNER */}
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', {
              type: 'Category',
              params: 'Tech'
            })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={techIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Tech
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', {
              type: 'Category',
              params: 'Music'
            })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={musicDevicesIcon}
              style={{ width: 45, height: 45 }}
            />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Music
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', {
              type: 'Category',
              params: 'Households'
            })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image
              source={homeAppliencesIcon}
              style={{ width: 45, height: 45 }}
            />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Households
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', {
              type: 'Category',
              params: 'Fashion'
            })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={fashionIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Fashion
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={() =>
            navigation.navigate('SearchedProducts', {
              type: 'Category',
              params: 'Sports'
            })
          }
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Image source={sportsIcon} style={{ width: 45, height: 45 }} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2
            }}
          >
            Sports
          </Text>
        </TouchableOpacity>
      </View>

      {/* HOT DEALS  */}
      <View>
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Hot Deals
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchedProducts', { type: 'topSelling' })
            }
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                color: '#407BFF',
                paddingVertical: 6
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          {ProductsOnSale.map((el, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.productCard,
                index !== ProductsOnSale.length - 1
                  ? { marginRight: 10 }
                  : { marginRight: 0 }
              ]}
              onPress={() =>
                navigation.navigate('ProductPage', { prodId: el._id })
              }
            >
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: el.images[0] }}
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
        </ScrollView>
      </View>

      {/* Image Banner */}
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 10
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

      {/* TOP REVIEWED  */}
      <View>
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold, fontSize: 20 }}>
            Top Reviewed
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('SearchedProducts', { type: 'topReviewed' })
            }
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                color: '#407BFF',
                paddingVertical: 6
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {/* Newly Added Product List */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        >
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {TopReviewedProducts.map((el, index) => (
              <TouchableOpacity
                key={el._id}
                style={[styles.productCard, ApplyMargin(index)]}
                onPress={() =>
                  navigation.navigate('ProductPage', { prodId: el._id })
                }
              >
                <View style={{ alignItems: 'center' }}>
                  <Image
                    source={{ uri: el.images[0] }}
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
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  productCard: {
    width: 155,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(220,220,220, .7)',
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
