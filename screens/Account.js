import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FONTS, COLORS, IMAGES } from '../constants';

// icons
import pendingOrderIcon from '../assets/icons/pendingOrderIcon.png';
import activeOrderIcon from '../assets/icons/activeOrderIcon.png';
import returnedOrderIcon from '../assets/icons/returnedOrderIcon.png';
import deliveredOrderIcon from '../assets/icons/deliveredOrderIcon.png';
import cancelledOrderIcon from '../assets/icons/cancelledOrderIcon.png';

import helpAccIcon from '../assets/icons/helpAccIcon.png';
import paymentAccIcon from '../assets/icons/paymentAccIcon.png';
import reviewsAccIcon from '../assets/icons/reviewsAccIcon.png';
import messageAccIcon from '../assets/icons/messageAccIcon.png';

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
        {/* My Orders */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: FONTS.PoppinsBold }}>My Orders:</Text>
          <View>
            <Text style={{ fontFamily: FONTS.Poppins, color: COLORS.PRIMARY }}>
              View All
            </Text>
          </View>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={deliveredOrderIcon}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Delivered</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={pendingOrderIcon}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Pending</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image source={activeOrderIcon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Active</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={returnedOrderIcon}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Returned</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={cancelledOrderIcon}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Cancelled</Text>
          </View>
        </View>

        {/* My Services */}
        <View
          style={{
            marginTop: 10
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold }}>My Services:</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 20
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image source={messageAccIcon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Messages</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image source={reviewsAccIcon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>My Reviews</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image source={paymentAccIcon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Payments</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image source={helpAccIcon} style={{ width: 40, height: 40 }} />
            <Text style={{ fontSize: 12, marginTop: 4 }}>Support Desk</Text>
          </View>
        </View>

        {/* Settings */}
        <View
          style={{
            marginTop: 10,
            paddingBottom: 10
          }}
        >
          <Text style={{ fontFamily: FONTS.PoppinsBold }}>Settings:</Text>
        </View>
        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderBottomColor: '#e1e1e1',
              borderTopColor: '#e1e1e1'
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
              Account Information
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#e1e1e1'
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
              Address Book
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#e1e1e1'
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
              Messages
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#e1e1e1'
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
              Utilities
            </Text>
          </View>

          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#e1e1e1'
            }}
          >
            <Text style={{ fontSize: 14, fontFamily: FONTS.Poppins }}>
              Privacy Policy
            </Text>
          </View>
        </View>
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
