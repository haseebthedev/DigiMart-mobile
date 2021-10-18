import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import editIcon from '../../../assets/icons/editIcon.png';
import deleteIcon from '../../../assets/icons/deleteIcon.png';
import productImage from '../../../assets/images/laptop-image.png';

const { width, height } = Dimensions.get('screen');

const Reviews = ({ navigation }) => {
  const [reviewsList, setReviewsList] = useState([
    {
      _id: '611a49afa097252998d7ab4f',
      pictures: [],
      productName: 'HP Laptop',
      storeName: 'Google PK',
      comment: 'The product was average.',
      rating: 2.6,
      response: 'LOL!'
    },
    {
      _id: '612a49afa097252998d7ab9f',
      pictures: [],
      productName: 'Dell Mouse',
      storeName: 'Realme Store',
      comment:
        'The product was not good. Actually my product was broken. Actually my product was broken.',
      rating: 4.3,
      response: 'Thank You!'
    }
  ]);

  // Review Card
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginHorizontal: 20,
          width: width - 40,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          borderRadius: 4,
          overflow: 'hidden'
        }}
        elevation={1}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10
          }}
        >
          <View style={{ padding: 10 }}>
            <Image
              source={productImage}
              style={{ width: 50, height: 50, margin: 8 }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.PoppinsBold,
                  fontSize: FONTS.Paragraph2
                }}
              >
                {item.productName}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: FONTS.Paragraph4,
                  color: 'grey',
                  marginLeft: 8
                }}
              >
                27-OCT-2021
              </Text>
            </View>

            <View style={{ width: 160 }}>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: FONTS.Paragraph3,
                  textAlign: 'justify'
                }}
              >
                {item.comment}
              </Text>
            </View>
            <View
              style={{
                marginVertical: 5,
                alignItems: 'flex-start'
              }}
            >
              <Rating
                readonly={true}
                ratingColor="#3498db"
                ratingBackgroundColor="#c8c7c8"
                startingValue={item.rating}
                imageSize={14}
              />
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View>
          {/* Edit Icon */}
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#407BFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20,
              marginBottom: 5
            }}
          >
            <Image
              source={editIcon}
              style={{ width: 15, height: 15, tintColor: '#FFF' }}
            />
          </TouchableOpacity>
          {/* Delete Icon */}
          <TouchableOpacity
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#407BFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              marginRight: 20,

              marginTop: 5
            }}
          >
            <Image
              source={deleteIcon}
              style={{ width: 20, height: 20, tintColor: '#FFF' }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 30
        }}
      >
        REVIEWS
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

      {/* Reviews List */}
      <View>
        <FlatList
          data={reviewsList}
          renderItem={renderItem}
          keyExtractor={(item) => Math.random() * 0.43}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Reviews;
