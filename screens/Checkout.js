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
import deleteIcon from '../assets/icons/deleteIcon.png';
import backIcon from '../assets/icons/backIcon.png';

const Cart = ({ navigation }) => {
  const [Quantity, setQuantity] = useState(1);
  const [CheckOutModal, setCheckOutModal] = useState(false);

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
                Est. Arrival: 30 Oct 2021
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
                Total Charges: Rs. 2499
              </Text>
              <Text
                style={{
                  fontFamily: FONTS.Poppins,
                  fontSize: 12,
                  color: 'grey'
                }}
              >
                Item Quantity: x18
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
              Rs. {Math.floor(Math.random() * 5000)}
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
            <Text style={{ color: '#407BFF' }}>
              Rs. {Math.floor(Math.random() * 100)}
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
          onPress={() => setCheckOutModal(true)}
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
