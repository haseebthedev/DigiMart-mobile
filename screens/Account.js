import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS, COLORS } from '../constants';

// icons
import pendingOrderIcon from '../assets/icons/pendingOrderIcon.png';
import activeOrderIcon from '../assets/icons/activeOrderIcon.png';
import returnedOrderIcon from '../assets/icons/returnedOrderIcon.png';
import deliveredOrderIcon from '../assets/icons/deliveredOrderIcon.png';
import cancelledOrderIcon from '../assets/icons/cancelledOrderIcon.png';
import paymentAccIcon from '../assets/icons/paymentAccIcon.png';
import reviewsAccIcon from '../assets/icons/reviewsAccIcon.png';
import messageAccIcon from '../assets/icons/messageAccIcon.png';
import helpAccIcon from '../assets/icons/helpAccIcon.png';
import reportProbIcon from '../assets/icons/reportProbIcon.png';
import settingIcon from '../assets/icons/settingsIcon.png';

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Top Header */}
      <LinearGradient
        colors={['#006BDA', '#2C88EA', '#407BFF']}
        style={{
          height: 120,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('LikedProducts')}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 22,
              color: 'white'
            }}
          >
            12
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 14,
              color: 'white'
            }}
          >
            Liked Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignItems: 'center' }}
          onPress={() => navigation.navigate('StoresFollowed')}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 22,
              color: 'white'
            }}
          >
            4
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 14,
              color: 'white'
            }}
          >
            Stores Followed
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Description */}
      <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
        {/* My Orders */}
        <View>
          <Text style={{ fontFamily: FONTS.PoppinsBold }}>My Orders:</Text>
        </View>
        <View
          style={{
            marginVertical: 20,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('DeliveredOrders')}
          >
            <Image
              source={deliveredOrderIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Delivered
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('PendingOrders')}
          >
            <Image
              source={pendingOrderIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('ActiveOrders')}
          >
            <Image
              source={activeOrderIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('ReturnedOrders')}
          >
            <Image
              source={returnedOrderIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Returned
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('CancelledOrders')}
          >
            <Image
              source={cancelledOrderIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Cancelled
            </Text>
          </TouchableOpacity>
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
          <TouchableOpacity
            style={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('Messages')}
          >
            <Image
              source={messageAccIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Messages
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={reviewsAccIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Reviews
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={paymentAccIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Payments
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={reportProbIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Report Problem
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={helpAccIcon}
              style={{ width: 40, height: 40, tintColor: '#006BDA' }}
            />
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: 4,
                color: 'grey'
              }}
            >
              Support
            </Text>
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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: 5
          }}
          onPress={() => navigation.navigate('Settings')}
        >
          <Image source={settingIcon} style={{ width: 50, height: 50 }} />
          <View style={{ paddingLeft: 20 }}>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 14,
                marginTop: 4
              }}
            >
              Settings & Config
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 12,
                color: 'grey'
              }}
            >
              App utilities and system configuration
            </Text>
          </View>
        </TouchableOpacity>
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
