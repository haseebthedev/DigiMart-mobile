import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  TextInput,
  FlatList
} from 'react-native';
import { RadioButton } from 'react-native-paper';

import api from '../../axios/api';
import { FONTS } from '../../constants/index';
import addIcon from '../../assets/icons/addIcon.png';
import backIcon from '../../assets/icons/backIcon.png';
import searchIcon from '../../assets/icons/searchIcon.png';

// Calculate margin for product cards
function ApplyMargin(index) {
  let margin = { marginRight: 0, marginBottom: 0 };
  margin =
    index % 2 === 0
      ? { marginRight: 5, marginBottom: 10 }
      : { marginLeft: 5, marginBottom: 10 };
  return margin;
}

function trimProdName(name) {
  let res = '';
  if (name.length > 14) {
    res = name.toString().substring(0, 13) + '...';
  } else {
    res = name;
  }
  return res;
}

const SearchAndFilter = ({ navigation }) => {
  // useEffect(() => {}, []);

  const [SearchType, setSearchType] = useState('products');
  const [SearchItem, setSearchItem] = useState('');

  const [productList, setProductList] = useState([]);
  const [storeList, setStoreList] = useState([]);

  const getSearchedItems = async () => {
    if (SearchType === 'products') {
      await api
        .get(`/buyer/products/search?name=${SearchItem}`)
        .then((res) => setProductList(res.data.data.products))
        .catch((error) => console.log('Error: ', error));
    } else {
      await api
        .get(`/buyer/search/store/${SearchItem}`)
        .then((res) => setStoreList(res.data.data.Stores))
        .catch((error) => console.log(error));
    }
  };

  function trimProdName(name) {
    let res = '';
    if (name.length > 18) {
      res = name.toString().substring(0, 18) + '...';
    } else {
      res = name;
    }
    return res;
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 40
        }}
      >
        Search in DigiMart
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

      {/* Searchbar */}
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 220,
              height: 50,
              paddingHorizontal: 10,
              paddingLeft: 40,
              backgroundColor: 'rgba(220,220,220, 0.5)',
              borderRadius: 5,
              justifyContent: 'center'
            }}
          >
            <Image
              source={searchIcon}
              style={{
                width: 20,
                height: 20,
                tintColor: 'grey',
                position: 'absolute',
                left: 10
              }}
            />
            <TextInput
              placeholder="Search in Digimart"
              style={{
                fontSize: 14,
                marginTop: -5,
                marginBottom: -10,
                fontFamily: FONTS.Poppins
              }}
              onChangeText={(text) => setSearchItem(text)}
            />
          </View>
          <TouchableOpacity
            style={{
              width: 70,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#407BFF',
              borderRadius: 5,
              marginLeft: 5
            }}
            onPress={() => getSearchedItems()}
          >
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                fontSize: 12,
                color: '#fff'
              }}
            >
              SEARCH
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Search type */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 20
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginRight: 20
          }}
        >
          <Text style={{ fontFamily: FONTS.Poppins }}>Products</Text>
          <RadioButton
            value="first"
            status={SearchType === 'products' ? 'checked' : 'unchecked'}
            onPress={() => setSearchType('products')}
            color="#407BFF"
          />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontFamily: FONTS.Poppins }}>Stores</Text>
          <RadioButton
            value="second"
            status={SearchType === 'stores' ? 'checked' : 'unchecked'}
            onPress={() => setSearchType('stores')}
            color="#407BFF"
          />
        </View>
      </View>

      {SearchItem !== '' ? (
        <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
          <Text style={{ fontFamily: FONTS.Poppins, color: 'grey' }}>
            Showing results for {"'" + SearchItem + "'"}
          </Text>
        </View>
      ) : (
        <View></View>
      )}

      {/* FOR PRODUCTS */}
      {SearchType === 'products' ? (
        <ScrollView style={{ paddingHorizontal: 20, marginBottom: 280 }}>
          {productList.map((item, index) => {
            return (
              <View
                style={{
                  marginVertical: 10
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: FONTS.Poppins,
                        fontSize: 12,
                        color: 'grey'
                      }}
                    >
                      {item.category + ' >> ' + item.subCategory}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.PoppinsBold,
                        fontSize: 20,
                        color: '#407BFF'
                      }}
                    >
                      {trimProdName(item.name)}
                    </Text>
                    <Text
                      style={{
                        fontFamily: FONTS.Poppins,
                        fontSize: 14,
                        color: 'black'
                      }}
                    >
                      {'Store: ' + item.storeName}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductPage', { prodId: item._id })
                    }
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.PoppinsBold,
                        fontSize: 14,
                        color: '#407BFF'
                      }}
                    >
                      VISIT LINK
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View></View>
      )}

      {/* FOR STORES */}
      {SearchType === 'stores' ? (
        <ScrollView style={{ paddingHorizontal: 20, marginBottom: 280 }}>
          {storeList.map((item, index) => {
            return (
              <View style={{ marginVertical: 10 }} key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center'
                    }}
                  >
                    <View style={{ marginRight: 10 }}>
                      <Image
                        source={{ uri: item.logo }}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                    <View>
                      <Text
                        style={{
                          fontFamily: FONTS.Poppins,
                          fontSize: 12,
                          color: 'grey'
                        }}
                      >
                        {'Category: ' + item.category}
                      </Text>
                      <View>
                        <Text
                          style={{
                            fontFamily: FONTS.PoppinsBold,
                            fontSize: 20,
                            color: '#407BFF',
                            marginBottom: -5
                          }}
                        >
                          {trimProdName(item.name)}
                        </Text>
                        <Text
                          style={{
                            fontFamily: FONTS.Poppins,
                            fontSize: 14,
                            color: 'black'
                          }}
                        >
                          {'Owner: ' + item.sellerName}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Store', {
                        storeId: item._id
                      })
                    }
                  >
                    <Text
                      style={{
                        fontFamily: FONTS.PoppinsBold,
                        fontSize: 14,
                        color: '#407BFF'
                      }}
                    >
                      VISIT STORE
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default SearchAndFilter;
