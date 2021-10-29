import React, { useState, useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RadioButton } from 'react-native-paper';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';
import api from '../axios/api';
// Icons
import backIcon from '../assets/icons/backIcon.png';
import emptyHeartIcon from '../assets/icons/emptyHeartIcon.png';
import FilledHeartIcon from '../assets/icons/FilledHeartIcon.png';
import cartIcon from '../assets/icons/cartIcon.png';
import { FONTS, COLORS } from '../constants';

// Dummy Images
import imageNotAvailable from '../assets/images/imageNotAvailable.png';
import sellerLogo from '../assets/images/seller-logo.png';

const { width, height } = Dimensions.get('window');

const ProductPage = ({ route, navigation }) => {
  const refRBSheet = useRef();
  const { prodId } = route.params;
  const [token, setToken] = useState('');
  const [IsLikedProduct, setIsLikedProduct] = useState(false);
  const [ProductDetails, setProductDetails] = useState({
    _id: '6133d94c010d5e2cc84487db',
    name: 'HP Laptop',
    description: 'testProduct',
    category: 'Electronics',
    subCategory: 'AC/DC Invertor',
    isOnSale: false,
    discountPercentage: null,
    warranty: '2 year',
    images: [imageNotAvailable],
    colors: ['green', 'black', 'purple'],
    isVisibilityEnabled: true,
    isAuthenticVendorProduct: false,
    vendorCompanyName: 'Other',
    vendorCategory: 'Other',
    manufactureDate: '11/06/2003',
    purchasePrice: 100,
    salePrice: 120,
    state: 'New',
    shippingCost: 100,
    discountPrice: 0,
    stockAvailable: 0,
    dimensions: '10in 10in 20in',
    weight: '200 grams',
    storeID: '6128c6ec00130918d0120ec4',
    storeName: 'ABC STORE',
    sellerID: '6128c65800130918d0120ec1',
    sellerName: 'Haseeb Ahmed',
    createdAt: '2021-09-04T20:38:36.583Z',
    updatedAt: '2021-10-05T20:34:26.762Z'
  });

  const [SelectedColor, setSelectedColor] = useState('red');
  const [Quantity, setQuantity] = useState(1);
  const [Reviews, setReviews] = useState([]);

  const retriveUserToken = async () => {
    try {
      let value = await AsyncStorage.getItem('@USER_TOKEN');
      if (value !== null) {
        setToken(value);
      }
    } catch (e) {
      console.log('Error :: Retriving token failed :: ', e);
    }
  };

  const addProductInLiked = async (product) => {
    try {
      // Delete here
      if (IsLikedProduct === true) {
        AsyncStorage.getItem('@LIKED_PRODUCTS').then(async (value) => {
          if (value !== null) {
            let dArr = JSON.parse(value);
            let newArr = dArr.filter((el) => el._id !== product._id);
            await AsyncStorage.setItem(
              '@LIKED_PRODUCTS',
              JSON.stringify(newArr)
            );
            setIsLikedProduct(false);
          }
        });
      }
      // Add here
      else {
        AsyncStorage.getItem('@LIKED_PRODUCTS').then(async (value) => {
          if (value !== null) {
            let dArr = JSON.parse(value);
            dArr.push(product);
            await AsyncStorage.setItem('@LIKED_PRODUCTS', JSON.stringify(dArr));
            setIsLikedProduct(true);
          } else {
            let newArr = [];
            newArr.push(product);
            await AsyncStorage.setItem(
              '@LIKED_PRODUCTS',
              JSON.stringify(newArr)
            );
            setIsLikedProduct(true);
          }
        });
      }
    } catch (e) {
      console.log('Error :: Saving Product failed :: ', e);
    }
  };

  const checkLikedStatus = async () => {
    let value = await AsyncStorage.getItem('@LIKED_PRODUCTS');
    if (value !== null) {
      let dArr = JSON.parse(value);
      let status = false;
      for (let i = 0; i < dArr.length; i++) {
        if (dArr[i]._id === ProductDetails._id) {
          status = true;
          break;
        }
      }
      setIsLikedProduct(status);
    }
  };

  const getProductsDetailsById = async () => {
    await api
      .get(`/buyer/product/${prodId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setProductDetails(res.data.data.product);
      })
      .catch((error) => console.log('ERROR: Fetching Product Details!'));
  };

  useEffect(() => {
    getProductsDetailsById();
  }, [token]);

  // Product Liked Status
  useEffect(() => {
    checkLikedStatus();
  });

  // Token
  useEffect(() => {
    retriveUserToken();
    checkLikedStatus();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 60 }}>
          <View>
            {/* Image Slider */}
            <SliderBox
              images={
                ProductDetails.images.length > 0
                  ? ProductDetails.images
                  : [imageNotAvailable]
              }
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

            {/* Like Button */}
            <TouchableNativeFeedback
              onPress={() => {
                addProductInLiked(ProductDetails);
                setIsLikedProduct(!IsLikedProduct);
              }}
            >
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
                  right: 20
                }}
              >
                <Image
                  source={
                    IsLikedProduct === true ? FilledHeartIcon : emptyHeartIcon
                  }
                  style={styles.likeButton}
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          {/* PRODUCT DESCRIPTION */}
          <View style={styles.productDetails}>
            <Text style={styles.title}>{ProductDetails.name}</Text>

            {/* Name, Rating */}
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
                // startingValue={ProductDetails.ratings.ratingValue}
                startingValue={2}
                imageSize={12}
              />
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 10,
                  marginLeft: 4
                }}
              >
                {'(231)'}
              </Text>
            </View>

            {/* Description */}
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
                Description:
              </Text>
              <Text style={styles.description}>
                {ProductDetails.description}
              </Text>
            </View>

            {/* Specifications */}
            <View style={{ marginTop: 15 }}>
              <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
                Specifications:
              </Text>
              {/* Specifications */}
              <View style={styles.specsRow}>
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
                <View style={{ flexDirection: 'row' }}>
                  {ProductDetails.colors.map((el, index) => (
                    <View
                      style={{
                        backgroundColor: el.toLowerCase(),
                        width: 20,
                        height: 20,
                        opacity: 0.6,
                        borderRadius: 15,
                        marginLeft: 5
                      }}
                      key={index}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Seller:</Text>
                <Text style={styles.specsText}>{ProductDetails.storeName}</Text>
              </View>

              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Product Category:</Text>
                <Text style={styles.specsText}>{ProductDetails.category}</Text>
              </View>

              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Sub Category:</Text>
                <Text style={styles.specsText}>
                  {ProductDetails.subCategory}
                </Text>
              </View>
              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Product State:</Text>
                <Text style={styles.specsText}>{ProductDetails.state}</Text>
              </View>
              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Available Stock:</Text>
                <Text style={styles.specsText}>
                  {ProductDetails.stockAvailable}
                </Text>
              </View>
              <View style={styles.specsRow}>
                <Text style={styles.specsText}>Delivery Charges (RS):</Text>
                <Text style={styles.specsText}>
                  {ProductDetails.shippingCost}
                </Text>
              </View>

              <View style={[styles.specsRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.specsText}>Warranty:</Text>
                <Text style={styles.specsText}>{ProductDetails.warranty}</Text>
              </View>
            </View>

            {/* Reviews */}
            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
                  Reviews:
                </Text>
                <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
                  View All
                </Text>
              </View>

              {/* {Reviews.map((el, index) => (
                <View style={{ paddingTop: 10 }} key={index}>
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
                        marginBottom: 10
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
              ))} */}
            </View>

            {/* Seller Details */}
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
                Sold By:
              </Text>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={() => navigation.navigate('Store')}
                >
                  <Image
                    source={sellerLogo}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 30,
                      marginRight: 10,
                      borderWidth: 2,
                      borderColor: 'black'
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: FONTS.PoppinsBold,
                        fontSize: FONTS.Paragraph2
                      }}
                    >
                      {ProductDetails.storeName}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.Poppins,
                        fontSize: FONTS.Paragraph3
                      }}
                    >
                      Islamabad, Pakistan
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 4
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: FONTS.Paragraph3
                    }}
                  >
                    Follow
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab */}
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: FONTS.Poppins }}>Rs. </Text>
          <Text
            style={{ fontSize: FONTS.subhead2, fontFamily: FONTS.PoppinsBold }}
          >
            {ProductDetails.salePrice}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(220,220,220, .6)',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 8
          }}
          onPress={() => refRBSheet.current.open()}
        >
          <Image
            source={cartIcon}
            style={{ width: 20, height: 20, marginTop: -4, marginRight: 5 }}
          />
          <View
            style={{
              fontSize: FONTS.Paragraph2,
              fontFamily: FONTS.Poppins
            }}
          >
            <Text>Add to Cart</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Modal */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0, 0.5)'
          },
          container: {
            paddingHorizontal: 20
          },
          draggableIcon: {
            backgroundColor: '#e1e1e1'
          }
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
            Choose Color:
          </Text>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              {ProductDetails.colors.map((el, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    width: 35,
                    height: 35,
                    backgroundColor: el.toLowerCase(),
                    borderRadius: 20,
                    margin: 8,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 1
                  }}
                  onPress={() => setSelectedColor(el.toLowerCase())}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: '#fff',
                      borderRadius: 20,

                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 1
                    }}
                  >
                    <View
                      style={[
                        {
                          width: 22,
                          height: 22,
                          opacity: 0.6,
                          backgroundColor: el.toLowerCase(),
                          borderRadius: 15
                        },
                        SelectedColor == el.toLowerCase()
                          ? { opacity: 1 }
                          : { opacity: 0 }
                      ]}
                    ></View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontFamily: FONTS.PoppinsBold, color: 'grey' }}>
            Quantity:
          </Text>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 8
              }}
            >
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderColor: '#DCDCDC',
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 0,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => setQuantity((prev) => prev - 1)}
              >
                <Text style={{ fontSize: 18 }}>-</Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 80,
                  height: 30,
                  borderColor: '#e1e1e1',
                  borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Text style={{ fontFamily: FONTS.Poppins }}>{Quantity}</Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  borderColor: '#DCDCDC',
                  borderLeftWidth: 0,
                  borderTopWidth: 1,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                onPress={() => setQuantity((prev) => prev + 1)}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#407BFF',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              borderRadius: 6
            }}
          >
            <Text style={{ fontFamily: FONTS.PoppinsBold, color: '#fff' }}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
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
  likeButton: {
    width: 25,
    height: 25,
    tintColor: 'red'
  },
  productDetails: {
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  title: {
    fontSize: FONTS.subhead3,
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
    borderTopColor: 'rgba(220,220,220, 1)',
    backgroundColor: '#fff'
  },
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: 'rgba(220,220,220, 1)',
    borderBottomWidth: 1
  },
  specsText: {
    fontSize: FONTS.Paragraph3,
    fontFamily: FONTS.Poppins,
    color: 'grey'
  }
});

export default ProductPage;
