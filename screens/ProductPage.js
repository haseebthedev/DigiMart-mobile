import React, { useState, useEffect, useRef } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
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
import { SliderBox } from 'react-native-image-slider-box';
import { Rating } from 'react-native-ratings';

// Icons
import backIcon from '../assets/icons/backIcon.png';
// import emptyHeartIcon from '../assets/icons/emptyHeartIcon.png';
import FilledHeartIcon from '../assets/icons/FilledHeartIcon.png';
import cartIcon from '../assets/icons/cartIcon.png';
import { FONTS, COLORS } from '../constants';

// Dummy Images
import reviewImage from '../assets/images/laptop-image.png';
import sellerLogo from '../assets/images/seller-logo.png';

const { width, height } = Dimensions.get('window');

const ProductPage = ({ navigation }) => {
  const [BannerImages, setBannerImages] = useState([]);
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

  const [SelectedColor, setSelectedColor] = useState('red');
  const [Quantity, setQuantity] = useState(1);

  // Modal AddToCart
  const refRBSheet = useRef();

  useEffect(() => {
    const images = [
      'https://source.unsplash.com/1024x768/?laptop',
      'https://source.unsplash.com/1024x768/?macbook',
      'https://source.unsplash.com/1024x768/?hp laptop'
    ];

    setSelectedColor(ProductDetails.colors[0]);
    setBannerImages(images);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 60 }}>
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

            {/* Like Button */}
            <TouchableNativeFeedback
              onPress={() =>
                ToastAndroid.show(
                  'You liked this Product!',
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              }
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
                <Image source={FilledHeartIcon} style={styles.likeButton} />
              </View>
            </TouchableNativeFeedback>
          </View>

          {/* PRODUCT DESCRIPTION */}
          <View style={styles.productDetails}>
            <Text style={styles.title}>{ProductDetails.title}</Text>

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
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    {ProductDetails.colors.map((el, index) => (
                      <View
                        style={{
                          width: 25,
                          height: 25,
                          opacity: 0.6,
                          backgroundColor: el,
                          borderRadius: 15,
                          marginLeft: 8
                        }}
                        key={index}
                      ></View>
                    ))}
                  </View>
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

              {ProductDetails.reviews.map((el, index) => (
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
              ))}
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
                      Tech Traders PK
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
            {ProductDetails.price}
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
                  style={[
                    {
                      width: 32,
                      height: 32,
                      backgroundColor: el,
                      borderRadius: 20,
                      margin: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.4
                    }
                  ]}
                  onPress={() => setSelectedColor(el)}
                >
                  <View
                    style={[
                      {
                        width: 25,
                        height: 25,
                        opacity: 0.6,
                        backgroundColor: el,
                        borderRadius: 15
                      },
                      SelectedColor === el ? { opacity: 1 } : { opacity: 0 }
                    ]}
                  ></View>
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
