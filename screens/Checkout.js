import React, { useState } from 'react';
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
  StatusBar
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
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

const Cart = ({ route, navigation }) => {
  const { user } = UserContext();
  const { cartList, ADD_ITEM } = CartContext();
  const { totalQuantity, totalDiscount, subTotalPrice, shippingFee } =
    route.params;
  const [CheckOutModal, setCheckOutModal] = useState(false);

  const [deliveryAddress, setDeliveryAddress] = useState('Rawalpindi');
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Nothing.');
  const [couponCode, setCouponCode] = useState('BESTBUY');

  const calAmount = () => {
    let amount = subTotalPrice - totalDiscount;
    amount += shippingFee;
    return amount;
  };

  function deliveryDate(d) {
    var date = new Date();
    var dd = date.getDate() + 4;
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (d = dd + '-' + mm + '-' + yyyy);
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

          console.log('running...');
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
            couponCode: 'DIGI123',
            totalDiscount: totalDiscount,
            subTotalPrice: subTotalPrice,
            totalPrice: subTotalPrice - totalDiscount + shippingFee,
            shippingFee: shippingFee,
            deliveryInstructions: 'Please wear mask while delivery.',
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
            House # 377 D-3, Satellite town 46300, Rawalpindi
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
            <Text style={{ color: '#407BFF', fontFamily: FONTS.Poppins }}>
              EDIT
            </Text>
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
            +92 3455488219
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
            haseeb@gmail.com
          </Text>
        </View>

        {/* Delivery Option */}
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Image source={deliveryIcon} style={{ width: 20, height: 20 }} />
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginLeft: 10 }}>
              Delivery Option
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
                source={okIcon}
                style={{ width: 25, height: 25, tintColor: COLORS.PRIMARY }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: FONTS.Poppins, marginTop: 5 }}>
                Cash on Delivery
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
                Total Charges: Rs. {subTotalPrice}
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
            </View>
          </View>
        </View>

        {/* Discount Code */}
        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            <TextInput
              placeholder="Coupon Code"
              style={{
                borderColor: '#e1e1e1',
                borderWidth: 1,
                paddingHorizontal: 15,
                fontFamily: FONTS.Poppins,
                height: 40,
                width: width - 120
              }}
            />
          </KeyboardAvoidingView>
          <View
            style={{
              height: 40,
              backgroundColor: '#407BFF',
              paddingHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontFamily: FONTS.Poppins, color: '#fff' }}>
              APPLY
            </Text>
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
            Total:{' '}
            <Text style={{ fontFamily: FONTS.PoppinsBold, color: '#407BFF' }}>
              Rs. {calAmount()}
            </Text>
          </Text>
          <Text
            style={{
              color: 'grey',
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.Paragraph3
            }}
          >
            Discount:{' '}
            <Text style={{ color: '#407BFF' }}>Rs. {totalDiscount}</Text>
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
