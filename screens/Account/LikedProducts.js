import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS, COLORS, IMAGES } from '../../constants/index';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';
import backIcon from '../../assets/icons/backIcon.png';

const { width, height } = Dimensions.get('screen');

function trimProdName(name) {
  let res = '';
  if (name.length > 16) {
    res = name.toString().substring(0, 16) + '...';
  } else {
    res = name;
  }
  return res;
}

const LikedProducts = ({ navigation }) => {
  const [selectedProduct, setSelectedProduct] = useState();
  const [DeleteProductModal, setDeleteProductModal] = useState(false);
  const [LikedProducts, setLikedProducts] = useState([]);

  const retriveLikedProducts = () => {
    AsyncStorage.getItem('@LIKED_PRODUCTS').then((value) => {
      if (value !== null) {
        setLikedProducts(JSON.parse(value));
      }
    });
  };

  // Delete Product from Cart
  const deleteProduct = async () => {
    let newArr = LikedProducts.filter((el) => el._id !== selectedProduct);
    setLikedProducts(newArr);
    await AsyncStorage.setItem('@LIKED_PRODUCTS', JSON.stringify(newArr));
  };

  // Product Card
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
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
        onPress={() => navigation.navigate('ProductPage', { prodId: item._id })}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Product Image */}
          <View style={{ padding: 10 }}>
            <Image
              source={
                item.images.length > 0
                  ? { uri: item.images[0] }
                  : imageNotAvailable
              }
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
              {trimProdName(item.name)}
            </Text>
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

        {/* Delete Icon */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#407BFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginRight: 20
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
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    retriveLikedProducts();
  }, []);

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
        LIKED PRODUCTS
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

      {/* Product List */}
      <FlatList
        data={LikedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />

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

export default LikedProducts;
