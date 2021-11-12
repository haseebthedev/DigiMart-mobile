import React, { useState } from 'react';
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

import reviewImage from '../../assets/images/laptop-image.png';

const Reviews = ({ navigation }) => {
  const [ProductDetails] = useState({
    title: 'HP Laptop 2021',
    ratings: {
      ratingValue: '4.3',
      ratingCount: 234
    },
    category: 'Electronics',
    subCategory: 'AC/DC Invertor',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    price: '120.00',
    warranty: '2 years',
    state: 'New',
    shippingCost: 120,
    stockAvailable: 20,
    storeName: 'GUCCI Pakistan',
    colors: ['red', 'green', 'blue'],
    reviews: [
      {
        id: 1,
        pictures: [reviewImage, reviewImage, reviewImage],
        buyerName: 'Haseeb Ahmed',
        comment: 'Product is nice.',
        rating: 4.3,
        createdAt: '2021-08-16T11:19:11.787+00:00'
      },
      {
        id: 2,
        pictures: [reviewImage, reviewImage],
        buyerName: 'M. Ameen',
        comment: 'This Product is very cheap!',
        rating: 4.7,
        createdAt: '2021-08-16T11:19:11.787+00:00'
      }
    ]
  });

  return (
    <View>
      <ScrollView>
        {/* PRODUCTS DEALS  */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 0,
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 20,
              marginBottom: 10
            }}
          >
            Reviews
          </Text>
        </View>

        {/* Reviews */}
        <View>
          {ProductDetails.reviews.map((el, index) => (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: '#fff',
                marginBottom: 10,
                borderRadius: 6,
                elevation: 1,
                marginHorizontal: 20
              }}
              key={index}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.specsText}>{el.buyerName}</Text>
                  <Text style={[styles.specsText, { marginHorizontal: 4 }]}>
                    -
                  </Text>
                  <Text style={styles.specsText}>
                    {new Date(el.createdAt).toLocaleDateString()}
                  </Text>
                </View>
                <View>
                  <Rating
                    readonly={true}
                    ratingColor="#3498db"
                    ratingBackgroundColor="#c8c7c8"
                    startingValue={el.rating}
                    imageSize={12}
                  />
                </View>
              </View>

              <View>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph3,
                    marginTop: 4,
                    marginBottom: 5
                  }}
                >
                  {el.comment}
                </Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                {el.pictures.map((el, index) => (
                  <Image
                    key={index}
                    source={el}
                    style={{
                      width: 60,
                      height: 60,
                      marginRight: 8
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
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
  heading: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5
  },
  specsText: {
    fontFamily: FONTS.Poppins,
    fontSize: FONTS.Paragraph3
  }
});

export default Reviews;
