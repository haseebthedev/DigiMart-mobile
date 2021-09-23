import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../constants/index';
import deleteIcon from '../assets/icons/deleteIcon.png';
import productImage from '../assets/images/laptop-image.png';
const { width, height } = Dimensions.get('screen');

const Cart = ({ navigation }) => {
  const [Quantity, setQuantity] = useState(1);

  return (
    <View style={styles.container}>
      {/* Item */}
      {[1, 2, 3].map((el) => (
        <View
          key={el}
          style={{
            marginTop: 10,
            marginHorizontal: 20,
            width: width - 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            borderRadius: 4,
            overflow: 'hidden'
          }}
          elevation={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Product Image */}
            <View style={{ padding: 10 }}>
              <Image
                source={productImage}
                style={{ width: 50, height: 50, margin: 8 }}
              />
            </View>

            {/* Product Details */}
            <View style={{ marginLeft: 10 }}>
              <Text
                style={{
                  fontFamily: FONTS.PoppinsBold,
                  fontSize: FONTS.Paragraph1
                }}
              >
                HP 15 Laptop
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 4
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
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
                    width: 40,
                    height: 25,
                    borderColor: '#e1e1e1',
                    borderWidth: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONTS.Poppins,
                      fontSize: FONTS.Paragraph3
                    }}
                  >
                    {Quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 25,
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
          </View>

          {/* Delete Icon */}
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: '#407BFF',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
              position: 'absolute',
              top: 10,
              right: 10
            }}
          >
            <Image
              source={deleteIcon}
              style={{ width: 20, height: 20, tintColor: '#FFF' }}
            />
          </View>

          {/* Product Price */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              bottom: 10,
              right: 10
            }}
          >
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: FONTS.Paragraph2
              }}
            >
              Rs. {Math.floor(Math.random() * 1000)}
            </Text>
          </View>
        </View>
      ))}

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
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              color: 'grey',
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.Paragraph3
            }}
          >
            Shipping:{' '}
            <Text style={{ color: '#407BFF' }}>
              Rs. {Math.floor(Math.random() * 100)}
            </Text>
          </Text>
          <Text
            style={{ fontFamily: FONTS.Poppins, fontSize: FONTS.Paragraph2 }}
          >
            Total:{' '}
            <Text style={{ fontFamily: FONTS.PoppinsBold, color: '#407BFF' }}>
              Rs. {Math.floor(Math.random() * 5000)}
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
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: FONTS.PoppinsBold,
              fontSize: FONTS.Paragraph2
            }}
          >
            Check Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
    // justifyContent: 'center',
  }
});

export default Cart;
