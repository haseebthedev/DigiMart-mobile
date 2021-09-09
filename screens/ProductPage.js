import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  Dimensions
} from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';

// Icons
import backIcon from '../assets/icons/backIcon.png';
// import addToCartIcon from '../assets/icons/cartIcon.png';
import cartIcon from '../assets/icons/cartIcon.png';
import { FONTS } from '../constants';

// Color Convertor
function StringToColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

const { width, height } = Dimensions.get('window');

const ProductPage = ({ navigation }) => {
  const [BannerImages, setBannerImages] = useState([]);
  const [ProductDetails] = useState({
    title: 'HP Laptop 2021',
    ratings: {
      ratingValue: '4.3',
      ratingCount: 234
    },
    price: '120.00',
    colors: ['red', 'green', 'blue'],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  });

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/1024x768/?laptop',
      'https://source.unsplash.com/1024x768/?macbook',
      'https://source.unsplash.com/1024x768/?hp laptop'
    ];

    setBannerImages(images);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {/* Image Slider */}
        <SliderBox
          images={BannerImages}
          sliderBoxHeight={320}
          dotColor="#FFF"
          inactiveDotColor="#90A4AE"
          dotStyle={{
            width: 8,
            height: 8
          }}
          paginationBoxVerticalPadding={25}
          resizeMethod={'resize'}
          resizeMode={'cover'}
        />

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
            <Image source={backIcon} style={styles.backButton} />
          </View>
        </TouchableNativeFeedback>
      </View>

      <View style={styles.productDetails}>
        <Text style={styles.title}>{ProductDetails.title}</Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10
          }}
        >
          <Rating
            readonly={true}
            ratingColor="#3498db"
            ratingBackgroundColor="#c8c7c8"
            startingValue={ProductDetails.ratings.ratingValue}
            imageSize={12}
          />
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 10,
              marginLeft: 4
            }}
          >
            {'(' + ProductDetails.ratings.ratingCount + ')'}
          </Text>
        </View>

        <View style={{ marginTop: 5 }}>
          <Text style={styles.description}>{ProductDetails.description}</Text>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15
            }}
          >
            <Text
              style={{
                fontSize: FONTS.Paragraph3,
                fontFamily: FONTS.Poppins,
                color: 'grey',
                marginRight: 15
              }}
            >
              Available Colors:
            </Text>
            {ProductDetails.colors.map((el, index) => (
              <View
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: StringToColor(el),
                  // backgroundColor: el,
                  borderRadius: 15,
                  marginRight: 8
                }}
                key={index}
              ></View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: FONTS.Poppins }}>Rs. </Text>
          <Text
            style={{ fontSize: FONTS.subhead2, fontFamily: FONTS.PoppinsBold }}
          >
            {ProductDetails.price}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(220,220,220, .6)',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8
          }}
        >
          <Image
            source={cartIcon}
            style={{ width: 20, height: 20, marginTop: -4, marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: FONTS.Paragraph2,
              fontFamily: FONTS.Poppins
            }}
          >
            Add to Cart
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backButton: {
    width: 25,
    height: 25,
    tintColor: 'black'
  },
  productDetails: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: FONTS.subhead1,
    fontFamily: FONTS.PoppinsBold
  },
  description: {
    fontSize: FONTS.Paragraph3,
    fontFamily: FONTS.Poppins,
    textAlign: 'justify',
    color: 'grey'
  },
  bottomBar: {
    paddingHorizontal: 20,
    width: width,
    height: 60,
    position: 'absolute',
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(220,220,220, 1)'
  }
});

export default ProductPage;
