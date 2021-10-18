import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  ScrollView
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';

const { width, height } = Dimensions.get('screen');

const FAQ = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
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
          FAQ's
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

        <View
          style={{
            width: width - 40,
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            paddingTop: 20,
            borderRadius: 20,
            marginBottom: 20
          }}
        >
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginBottom: 20 }}>
              Payments / Delivery / Shipments
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text
                style={{ width: 22, fontFamily: FONTS.Poppins, fontSize: 12 }}
              >
                1 -
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    marginBottom: 10,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  Can we place order online and what are payment options?
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  Of course, you can place orders online. Upon confirmation of
                  your payment, we will dispatch your order as soon as possible.
                  Total time is based on the amount of time it takes to get
                  payment authorization, order processing, and the transit time
                  from the carrier. This can range from 24 hours to 10 days for
                  in-stock items. To avoid delays, please ensure that you have
                  provided us with the correct Shipping address.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text
                style={{ width: 22, fontFamily: FONTS.Poppins, fontSize: 12 }}
              >
                2 -
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    marginBottom: 10,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  Is cash on delivery option available?
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  Yes Cash On Delivery is available for Islamabad and Rawalpindi
                  only.
                </Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontFamily: FONTS.PoppinsBold, marginBottom: 20 }}>
              Buyer Rights Protection / Feedback
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text
                style={{ width: 22, fontFamily: FONTS.Poppins, fontSize: 12 }}
              >
                1 -
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    marginBottom: 10,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  Why do I write reviews?
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  We want to hear your opinions. We want consumers to get the
                  information they need to make smart buying choices. As a
                  DigiMart client, you can submit reviews for items listed on
                  DigiMart.com.pk. We encourage you to share your ideas, both
                  favourable and unfavourable.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{ width: 22, fontFamily: FONTS.Poppins, fontSize: 12 }}
              >
                2 -
              </Text>
              <View>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    marginBottom: 10,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  What are the Tips on writing a great review?
                </Text>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    width: 260,
                    textAlign: 'justify'
                  }}
                >
                  The best reviews include not only whether you liked or
                  disliked a product, but also why. Feel free to talk about
                  related products and how this item compares to them. Your
                  review should focus on specific features of the product and
                  your experience with it. The ideal length is 75 to 500 words.
                  We welcome your honest opinion about the product--positive or
                  negative. We do not remove reviews because they are critical.
                  We believe all helpful information can inform our customers’
                  buying decisions.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
});

export default FAQ;
