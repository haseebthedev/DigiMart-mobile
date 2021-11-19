import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList
} from 'react-native';
import { CartContext } from '../contexts/CartContext';
import { FONTS, COLORS, IMAGES } from '../constants/index';
import deleteIcon from '../assets/icons/deleteIcon.png';
import productImage from '../assets/images/laptop-image.png';
const { width, height } = Dimensions.get('screen');

const Cart = ({ navigation }) => {
  const { cartList, ADD_ITEM } = CartContext();
  const [productList, setproductList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [DeleteProductModal, setDeleteProductModal] = useState(false);

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);

  const calculatePrices = () => {
    let disc = 0;
    let subTotal = 0;
    let shipping = 0;
    let quantity = 0;

    for (let i = 0; i < productList.length; i++) {
      disc += productList[i].discountedPrice;
      subTotal += productList[i].salePrice * productList[i].quantity;
      shipping += productList[i].shippingCost;
      quantity += productList[i].quantity;
    }
    setSubTotalPrice(subTotal);
    setShippingFee(shipping);
    setTotalDiscount(disc);
    setTotalQuantity(quantity);
  };

  // Delete Product from Cart
  const deleteProduct = () => {
    let newArr = productList.filter((el) => el._id !== selectedProduct);
    setproductList(newArr);
    ADD_ITEM(newArr);
  };

  const calQty = (type, qty) => {
    if (type === 'INC') {
      return qty + 1;
    } else {
      if (qty > 1) {
        return qty - 1;
      } else {
        return 1;
      }
    }
  };

  const handleQuantity = (id, type) => {
    let prevProduct;

    productList.map((el) => {
      if (el._id === id) {
        prevProduct = el;
      }
    });

    let newProd = {
      ...prevProduct,
      quantity: calQty(type, prevProduct.quantity)
    };

    let newCart = productList.map((el) => (el._id === id ? newProd : el));
    setproductList(newCart);
    ADD_ITEM(newCart);
  };

  function trimProdName(name) {
    let res = '';
    if (name.length > 16) {
      res = name.toString().substring(0, 16) + '...';
    } else {
      res = name;
    }
    return res;
  }

  // Product Card
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
                fontSize: FONTS.Paragraph2
              }}
            >
              {trimProdName(item.title)}
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
                onPress={() => handleQuantity(item._id, 'DEC')}
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
                  {item.quantity}
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
                onPress={() => handleQuantity(item._id, 'INC')}
              >
                <Text style={{ fontSize: 18 }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Delete Icon */}
        <TouchableOpacity
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
          onPress={() => {
            setSelectedProduct(item._id);
            setDeleteProductModal(true);
          }}
        >
          <Image
            source={deleteIcon}
            style={{ width: 20, height: 20, tintColor: '#FFF' }}
          />
        </TouchableOpacity>

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
            Rs. {item.salePrice}
          </Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    setproductList(cartList);

    return () => setproductList([]);
  }, [cartList]);

  useEffect(() => {
    calculatePrices();
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={productList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

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
            <Text style={{ color: '#407BFF' }}>Rs. {shippingFee}</Text>
          </Text>
          <Text
            style={{ fontFamily: FONTS.Poppins, fontSize: FONTS.Paragraph2 }}
          >
            Total:{' '}
            <Text style={{ fontFamily: FONTS.PoppinsBold, color: '#407BFF' }}>
              Rs. {subTotalPrice}
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
          onPress={() =>
            navigation.navigate('Checkout', {
              totalQuantity: totalQuantity,
              totalDiscount: totalDiscount,
              subTotalPrice: subTotalPrice,
              shippingFee: shippingFee
            })
          }
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

      {/* Delete Product Modal */}
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={DeleteProductModal}
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
              This will delete the product from the Cart page!
            </Text>
            <View style={{ flexDirection: 'row', marginTop: 30 }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  marginRight: 5
                }}
                onPress={() => setDeleteProductModal(false)}
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
                  deleteProduct();
                  setDeleteProductModal(false);
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default Cart;
