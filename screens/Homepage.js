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
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';
import { FONTS, COLORS, IMAGES } from '../constants/index';

// Icons
import categoryIcon from '../assets/icons/categoriesIcon.png';
import topSellingIcon from '../assets/icons/topSellingIcon.png';
import topRatedIcon from '../assets/icons/topRatedIcon.png';
import newAddedIcon from '../assets/icons/newAddedIcon.png';
import cheapIcon from '../assets/icons/cheapIcon.png';
import techIcon from '../assets/icons/techIcon.png';
import musicDevicesIcon from '../assets/icons/musicDevicesIcon.png';
import fashionIcon from '../assets/icons/fashionIcon.png';
import sportsIcon from '../assets/icons/sportsIcon.png';
import homeAppliencesIcon from '../assets/icons/homeAppliencesIcon.png';
import addIcon from '../assets/icons/addIcon.png';

// Images
import laptopImage from '../assets/images/laptop-image.png';
import banner2 from '../assets/images/banner2.png';

// Calculate margin for product cards
function ApplyMargin(index) {
  let margin = { marginRight: 0, marginBottom: 0 };
  margin =
    index % 2 === 0
      ? { marginRight: 5, marginBottom: 10 }
      : { marginLeft: 5, marginBottom: 10 };
  return margin;
}

const { width, height } = Dimensions.get('window');

const Homepage = ({ navigation }) => {
  const [BannerImages, setBannerImages] = useState([]);
  const [ProductList] = useState([
    {
      id: 1,
      name: 'HP Laptop 15',
      price: '100',
      colors: '2 Colors',
      ratings: 4.6,
      image: require('../assets/images/laptop-image.png')
    },
    {
      id: 2,
      name: 'HP Laptop',
      price: '230',
      colors: '5 Colors',
      ratings: 2,
      image: require('../assets/images/laptop-image.png')
    },
    {
      id: 3,
      name: 'HP Laptop',
      price: '340',
      colors: '12 Colors',
      ratings: 5,
      image: require('../assets/images/laptop-image.png')
    },
    {
      id: 4,
      name: 'HP Laptop',
      price: '500',
      colors: '9 Colors',
      ratings: 4,
      image: require('../assets/images/laptop-image.png')
    },
    {
      id: 5,
      name: 'HP Laptop',
      price: '6000',
      colors: '4 Colors',
      ratings: 3.5,
      image: require('../assets/images/laptop-image.png')
    },
    {
      id: 6,
      name: 'HP Laptop',
      price: '2300',
      colors: '12 Colors',
      ratings: 2,
      image: require('../assets/images/laptop-image.png')
    }
  ]);

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/1024x768/?laptop',
      'https://source.unsplash.com/1024x768/?mobile',
      'https://source.unsplash.com/1024x768/?technology',
      'https://source.unsplash.com/1024x768/?macbook',
      'https://source.unsplash.com/1024x768/?engineer',
      'https://source.unsplash.com/1024x768/?ecommerce'
    ];

    setBannerImages(images);
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>
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
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
        </View>
      </View>

      {/* PRODUCTS DEALS  */}
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
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              color: '#407BFF',
              paddingVertical: 6
            }}
          >
            View All
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
    borderWidth: 1,
    borderColor: 'rgba(220,220,220, 1)',
    paddingHorizontal: 10
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
