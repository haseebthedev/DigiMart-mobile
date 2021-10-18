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

const PrivacyPolicy = ({ navigation }) => {
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
          PRIVACY POLICY
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
            paddingVertical: 20,
            borderRadius: 20,
            marginBottom: 20
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 12,
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            Welcome to the DigiMart website (the "Site") (Registration Number:
            'DM1234'). We respect your privacy and want to protect your personal
            information. To learn more, please read this Privacy Policy.
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 12,
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            This Privacy Policy explains how we collect, use and (under certain
            conditions) disclose your personal information. This Privacy Policy
            also explains the steps we have taken to secure your personal
            information. Finally, this Privacy Policy explains your options
            regarding the collection, use and disclosure of your personal
            information. By visiting the Site directly or through another site,
            you accept the practices described in this Policy.
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 12,
              textAlign: 'justify',
              marginBottom: 10
            }}
          >
            Data protection is a matter of trust and your privacy is important
            to us. We shall therefore only use your name and other information
            which relates to you in the manner set out in this Privacy Policy.
            We will only collect information where it is necessary for us to do
            so and we will only collect information if it is relevant to our
            dealings with you.
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 12,
              textAlign: 'justify'
            }}
          >
            We will only keep your information for as long as we are either
            required to by law or as is relevant for the purposes for which it
            was collected.
          </Text>
          <Text
            style={{
              fontFamily: FONTS.Poppins,
              fontSize: 12,
              textAlign: 'justify'
            }}
          >
            You can visit the Site and browse without having to provide personal
            details. During your visit to the Site you remain anonymous and at
            no time can we identify you unless you have an account on the Site
            and log on with your user name and password.
          </Text>
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

export default PrivacyPolicy;
