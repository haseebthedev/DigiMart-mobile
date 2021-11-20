import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating } from 'react-native-ratings';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import api from '../../../axios/api';
import backIcon from '../../../assets/icons/backIcon.png';
import editIcon from '../../../assets/icons/editIcon.png';
import deleteIcon from '../../../assets/icons/deleteIcon.png';
import productImage from '../../../assets/images/laptop-image.png';
import { UserContext } from '../../../contexts/UserContext';

const { width, height } = Dimensions.get('screen');

function trimName(name) {
  let res = '';
  if (name.length > 16) {
    res = name.toString().substring(0, 10) + '...';
  } else {
    res = name;
  }
  return res;
}

const Reviews = ({ navigation }) => {
  const { user } = UserContext();
  const [reviewsList, setReviewsList] = useState([]);
  const [selectedReview, setselectedReview] = useState();
  const [DeleteReviewModal, setDeleteReviewModal] = useState(false);

  const retriveReviews = async () => {
    await api
      .get('/buyer/reviews/view', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        setReviewsList(res.data.data.reviews);
      })
      .catch((error) => console.log('ERROR: Fetching reviews failed.'));
  };

  useEffect(() => {
    retriveReviews();
  }, []);

  const deleteReview = async () => {
    await api
      .delete(`/buyer/product/review/${selectedReview}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        let newRevs = reviewsList.filter((el) => el._id !== selectedReview);
        setReviewsList(newRevs);
      })
      .catch((error) => console.log('ERROR: Deleting review failed.'));
  };

  return (
    <ScrollView style={styles.container}>
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
      <View style={{ marginBottom: 20 }}>
        {reviewsList.map((item) => {
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
              key={item._id}
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
                      {trimName(item.productName)}
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
                  onPress={() => {
                    setselectedReview(item._id);
                    setDeleteReviewModal(true);
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
        })}
      </View>

      {/* Delete Product Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={DeleteReviewModal}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              width: width * 0.8,
              padding: 30,
              elevation: 10,
              alignItems: 'center'
            }}
          >
            <Image
              source={deleteIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: 'red',
                marginBottom: 30
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.Paragraph1,
                marginBottom: 10
              }}
            >
              Are You Sure?
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph2,
                textAlign: 'center',
                color: 'grey'
              }}
            >
              This will delete the review from the product page!
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setDeleteReviewModal(false)}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: 'red',
                  borderRadius: 4,
                  marginLeft: 5
                }}
                onPress={() => {
                  deleteReview();
                  setDeleteReviewModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2,
                    color: '#fff'
                  }}
                >
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Reviews;
