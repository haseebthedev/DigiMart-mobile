import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  Modal,
  TouchableNativeFeedback,
  StatusBar,
  ToastAndroid
} from 'react-native';
import api from '../axios/api';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { FONTS, COLORS, IMAGES } from '../constants/index';
const { width, height } = Dimensions.get('screen');

// icons
import addressIcon from '../assets/icons/addressIcon.png';
import phoneIcon from '../assets/icons/phoneIcon.png';
import mailIcon from '../assets/icons/mailIcon.png';
import deliveryIcon from '../assets/icons/deliveryIcon.png';
import okIcon from '../assets/icons/okIcon.png';
import paymentIcon from '../assets/icons/paymentIcon.png';
import orderSuccessIcon from '../assets/icons/orderSuccessIcon.png';
import backIcon from '../assets/icons/backIcon.png';
import directionIcon from '../assets/icons/directionIcon.png';
import dollarIcon from '../assets/icons/dollarIcon.png';
import paymentAccIcon from '../assets/icons/paymentAccIcon.png';

const Cart = ({ route, navigation }) => {
  const { user } = UserContext();
  const { cartList, ADD_ITEM } = CartContext();
  const { totalQuantity, totalPrice, subTotalPrice, shippingFee } =
    route.params;
  const [originalPrice, setOriginalPrice] = useState(0);
  const [profileData, setProfileData] = useState({
    email: 'Loading...',
    phoneNumber: 'Loading...',
    address: 'Loading...'
  });

  const STRIPE_KEY =
    'pk_test_51JxX22SD2TonFhJ3PRyA2XmA9KpKuTdaqkAg48q6jXXGOCOWxsUr7kPT0vybSDvzATWCXmCJmG0qMJ00p8eEEnD2004le4oDS1';

  const [ChangeAddressModal, setChangeAddressModal] = useState(false);
  const [CheckOutModal, setCheckOutModal] = useState(false);
  const [ChangeDeliveryMethod, setChangeDeliveryMethod] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const getUserInfo = async () => {
    await api
      .get('/buyer/me', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        const { email, phoneNumber, address } = res.data.data.buyer[0];

        setProfileData({
          email,
          phoneNumber,
          address
        });
      })
      .catch((e) => console.log('Error: Retriving User failed. ', e));
  };

  function deliveryDate() {
    var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 7000);
    var dd = currentDate.getDate();
    var mm = currentDate.getMonth() + 1;
    var yyyy = currentDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
  }

  const placeOrder = async () => {
    const AllStores = [];

    // Getting All Stores
    cartList.map((el) => {
      if (!AllStores.includes(el.storeName)) {
        AllStores.push(el.storeName);
      }
    });

    for (let i = 0; i < AllStores.length; i++) {
      const products = [];
      for (let j = 0; j < cartList.length; j++) {
        if (AllStores[i] === cartList[j].storeName) {
          products.push({
            productId: cartList[j]._id,
            name: cartList[j].title,
            salePrice: cartList[j].salePrice,
            discount: cartList[j].discount,
            discountedPrice: cartList[j].discountedPrice,
            quantity: cartList[j].quantity,
            color: cartList[j].color
          });
        }
      }

      await api
        .post(
          '/buyer/product/order',
          {
            products: products,
            name: 'Haseeb Ahmed',
            email: 'sheikh.ameen252@gmail.com',
            contactNumber: '+923359425690',
            deliveryAddress: 'B1339, rawalpindi',
            city: 'rawalpindi',
            subTotalPrice: subTotalPrice,
            totalPrice: totalPrice,
            shippingFee: shippingFee,
            deliveryInstructions: 'Please wear mask while delivery.',
            deliveryDate: '2021-11-24T07:03:11.212+00:00',
            totalQuantity: totalQuantity,
            paymentMethod: 'Cash on delivery'
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then((res) => {
          ADD_ITEM([]);
        })
        .catch((error) => {
          console.log('ERROR: ', error);
        });
    }

    ToastAndroid.show(
      'Order has been placed!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
    setCheckOutModal(true);
  };

  useEffect(() => {
    cartList.map((el) => {
      setOriginalPrice((val) => val + el.salePrice * el.quantity);
    });
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center'
        }}
      >
        CHECKOUT
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

      {/* Checkout Details */}
      <View
        style={{
          marginTop: 50,
          paddingHorizontal: 20
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={addressIcon} style={{ width: 20, height: 20 }} />
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
              Delivery Address
            </Text>
          </View>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              textAlign: 'justify',
              marginTop: 5
            }}
          >
            {profileData.address}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5
            }}
          >
            <Text
              style={{ color: 'grey', fontFamily: FONTS.Poppins, fontSize: 12 }}
            >
              Bill to the same details
            </Text>
            <TouchableOpacity onPress={() => setChangeAddressModal(true)}>
              <Text style={{ color: '#407BFF', fontFamily: FONTS.Poppins }}>
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Number */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={phoneIcon} style={{ width: 20, height: 20 }} />
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
              Contact Number
            </Text>
          </View>
          <Text style={{ fontFamily: FONTS.Poppins, marginTop: 5 }}>
            {profileData.phoneNumber}
          </Text>
        </View>

        {/* Email */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={mailIcon} style={{ width: 20, height: 20 }} />
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
              Email Address
            </Text>
          </View>
          <Text style={{ fontFamily: FONTS.Poppins, marginTop: 5 }}>
            {profileData.email}
          </Text>
        </View>

        {/* Delivery Option */}
        <View style={{ marginBottom: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'row' }}>
              <Image source={deliveryIcon} style={{ width: 20, height: 20 }} />
              <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
                Delivery Option
              </Text>
            </View>
            <TouchableOpacity onPress={() => setChangeDeliveryMethod(true)}>
              <Text style={{ color: '#407BFF', fontFamily: FONTS.Poppins }}>
                EDIT
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 5,
              borderWidth: 1,
              borderColor: '#e1e1e1',
              borderRadius: 4,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View>
              <Image
                source={okIcon}
                style={{ width: 25, height: 25, tintColor: COLORS.PRIMARY }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONTS.Poppins, marginTop: 5 }}>
                {paymentMethod}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 12,
                  color: 'grey'
                }}
              >
                Est. Arrival: {deliveryDate()}
              </Text>
            </View>
          </View>
        </View>

        {/* Total Charges */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={deliveryIcon} style={{ width: 20, height: 20 }} />
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
              Billing Charges
            </Text>
          </View>
          <View
            style={{
              marginTop: 5,
              borderWidth: 1,
              borderColor: '#e1e1e1',
              borderRadius: 4,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <View>
              <Image
                source={paymentIcon}
                style={{ width: 25, height: 25, tintColor: COLORS.PRIMARY }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONTS.Poppins, marginTop: 5 }}>
                Total Charges: Rs. {Math.floor(subTotalPrice)}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 12,
                  color: 'grey'
                }}
              >
                Item Quantity: x{totalQuantity}
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 12,
                  color: 'grey'
                }}
              >
                Shipping Cost: {shippingFee}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Checkout Button */}
      <View
        style={{
          width,
          height: 70,
          backgroundColor: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 0
        }}
      >
        <View>
          <Text
            style={{ fontFamily: FONTS.Poppins, fontSize: FONTS.Paragraph2 }}
          >
            Price To Pay:{' '}
            <Text style={{ fontFamily: FONTS.PoppinsBold, color: '#407BFF' }}>
              Rs. {Math.floor(totalPrice)}
            </Text>
          </Text>
          <Text
            style={{
              color: 'grey',
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.Paragraph3
            }}
          >
            Original Price:{' '}
            <Text
              style={{ color: '#407BFF', textDecorationLine: 'line-through' }}
            >
              Rs. {Math.floor(originalPrice)}
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={{
            paddingHorizontal: 25,
            paddingVertical: 8,
            backgroundColor: '#407BFF',
            borderRadius: 8
          }}
          onPress={placeOrder}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: FONTS.PoppinsBold,
              fontSize: FONTS.Paragraph2
            }}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>

      {/* Update Address Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={ChangeAddressModal}
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
              alignItems: 'center',
              borderRadius: 4
            }}
          >
            <Image
              source={directionIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: COLORS.PRIMARY,
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
              Enter Address
            </Text>
            <TextInput
              placeholder="Your Address"
              style={{
                width: 240,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#e1e1e1',
                marginHorizontal: 20,
                marginBottom: 10,
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph1,
                paddingTop: 15
              }}
              value={profileData.address}
              onChangeText={(text) =>
                setProfileData({ ...profileData, address: text })
              }
            />
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setChangeAddressModal(false)}
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
                  backgroundColor: COLORS.PRIMARY,
                  borderRadius: 4,
                  marginLeft: 5
                }}
                onPress={() => {
                  setChangeAddressModal(false);
                }}
              >
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: FONTS.Paragraph2,
                    color: '#fff'
                  }}
                >
                  Update
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Update Delivery Mode Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={ChangeDeliveryMethod}
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
              alignItems: 'center',
              borderRadius: 4
            }}
          >
            <Image
              source={paymentIcon}
              style={{
                width: 60,
                height: 60,
                tintColor: COLORS.PRIMARY,
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
              Select Payment Method
            </Text>

            <View>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => {
                  setChangeDeliveryMethod(false);
                  setPaymentMethod('Cash On Delivery');
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: '#DCDCDC',
                    borderRadius: 8
                  }}
                >
                  <Image
                    source={dollarIcon}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#000000',
                      marginRight: 5
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: FONTS.Paragraph2
                    }}
                  >
                    Cash On Delivery
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => {
                  setChangeDeliveryMethod(false);
                  setPaymentMethod('Pay With Credit Card');
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 8,
                    backgroundColor: '#DCDCDC',
                    borderRadius: 8
                  }}
                >
                  <Image
                    source={paymentAccIcon}
                    style={{
                      width: 20,
                      height: 20,
                      tintColor: '#000000',
                      marginRight: 5
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: FONTS.Paragraph2
                    }}
                  >
                    Pay With Credit Card
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Checkout Modal */}
      <Modal transparent={true} animationType={'fade'} visible={CheckOutModal}>
        <StatusBar backgroundColor="#000000" />
        <View style={styles.modal}>
          <Image
            source={orderSuccessIcon}
            style={{ width: 160, height: 160 }}
          />
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: FONTS.h6,
              color: '#fff',
              marginTop: 40
            }}
          >
            SUCCESS
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.Paragraph2,
              color: '#fff',
              paddingHorizontal: 30,
              textAlign: 'justify'
            }}
          >
            Your order has been placed. Please check email for further details.
            Your Order Tracking Id is #{' '}
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: FONTS.subhead4,
                color: '#fff'
              }}
            >
              DM-23234
            </Text>
            .
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 60,
              backgroundColor: '#fff',
              paddingHorizontal: 30,
              paddingVertical: 15,
              borderRadius: 8
            }}
            onPress={() => navigation.navigate('Homepage')}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph2,
                color: '#000000'
              }}
            >
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, .9)'
  }
});

export default Cart;
