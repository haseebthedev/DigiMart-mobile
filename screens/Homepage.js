import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, ScrollView} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

import {FONTS, COLORS, IMAGES} from '../constants/index';

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

// product image
import laptopImage from '../assets/images/laptop-image.png';

const Homepage = () => {
  const [BannerImages, setBannerImages] = useState([]);

  const [ProductList, setProductList] = useState([
    {
      id: 1,
      name: 'HP Laptop',
      price: '100',
      colors: '2 Colors',
      image: require('../assets/images/laptop-image.png'),
    },
    {
      id: 2,
      name: 'HP Laptop',
      price: '230',
      colors: '5 Colors',
      image: require('../assets/images/laptop-image.png'),
    },
    {
      id: 3,
      name: 'HP Laptop',
      price: '340',
      colors: '12 Colors',
      image: require('../assets/images/laptop-image.png'),
    },
    {
      id: 4,
      name: 'HP Laptop',
      price: '500',
      colors: '9 Colors',
      image: require('../assets/images/laptop-image.png'),
    },
    {
      id: 5,
      name: 'HP Laptop',
      price: '6000',
      colors: '4 Colors',
      image: require('../assets/images/laptop-image.png'),
    },
  ]);

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/1024x768/?laptop',
      'https://source.unsplash.com/1024x768/?mobile',
      'https://source.unsplash.com/1024x768/?tech',
      'https://source.unsplash.com/1024x768/?technology',
    ];

    setBannerImages(images);
  }, []);

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <View>
        <SliderBox
          images={BannerImages}
          sliderBoxHeight={140}
          dotColor="#FFF"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 8,
            height: 8,
          }}
          ImageComponentStyle={{borderRadius: 8, width: '90%'}}
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
          justifyContent: 'space-evenly',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={categoryIcon} style={{width: 45, height: 45}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Categories
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={topSellingIcon} style={{width: 45, height: 45}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Top Selling
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={topRatedIcon} style={{width: 45, height: 45}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Top Rated
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={newAddedIcon} style={{width: 45, height: 45}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            New Arrival
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={cheapIcon} style={{width: 45, height: 45}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
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
          justifyContent: 'space-evenly',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={techIcon} style={{width: 60, height: 60}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Technology
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={musicDevicesIcon} style={{width: 60, height: 60}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Music
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={sportsIcon} style={{width: 60, height: 60}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Sports
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={fashionIcon} style={{width: 60, height: 60}} />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Fashion
          </Text>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={homeAppliencesIcon}
              style={{width: 60, height: 60}}
            />
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              color: 'grey',
              marginTop: 2,
            }}>
            Appliances
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
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: FONTS.PoppinsBold, fontSize: 20}}>
            Hot Deals
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              backgroundColor: '#407BFF',
              color: '#fff',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 5,
            }}>
            View All
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          {ProductList.map((el, index) => (
            <View
              key={index}
              style={[
                styles.productCard,
                index !== ProductList.length - 1
                  ? {marginRight: 10}
                  : {marginRight: 0},
              ]}>
              <View style={{alignItems: 'center'}}>
                <Image source={laptopImage} style={{width: 110, height: 110}} />
              </View>
              <Text style={styles.productName}>{el.name}</Text>
              <View
                style={{
                  backgroundColor: '#407BFF',
                  width: 50,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                  borderRadius: 2,
                }}>
                <Text style={styles.productColors}>{el.colors}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 5,
                }}>
                <Text style={styles.productPrice}>{'Rs. ' + el.price}</Text>
                <Text style={styles.addBtn}>+</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productCard: {
    width: 160,
    borderWidth: 1,
    borderColor: 'rgba(220,220,220, 1)',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  productName: {
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph2,
  },
  productColors: {
    color: '#fff',
    fontSize: FONTS.Paragraph4,
  },
  productPrice: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: FONTS.Paragraph2,
  },
  addBtn: {
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.subhead1,
    color: '#407BFF',
  },
});

export default Homepage;
