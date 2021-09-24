import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { FONTS, COLORS, IMAGES } from '../constants';

// Device
const { width, height } = Dimensions.get('screen');

const Account = () => {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View
        style={{
          backgroundColor: '#e1e1e1',
          height: 120,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 22,
              color: 'black'
            }}
          >
            12
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 14,
              color: 'black'
            }}
          >
            Liked Products
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 22,
              color: 'black'
            }}
          >
            4
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 14,
              color: 'black'
            }}
          >
            Stores Followed
          </Text>
        </View>
      </View>

      {/* Description */}
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontFamily: FONTS.PoppinsBold }}>My Orders:</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    // paddingHorizontal: 20
  }
});

export default Account;
