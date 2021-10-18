import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import addIcon from '../../../assets/icons/addIcon.png';
import dollarIcon from '../../../assets/icons/dollarIcon.png';
import simIcon from '../../../assets/icons/simIcon.png';
import editIcon from '../../../assets/icons/editIcon.png';
import deleteIcon from '../../../assets/icons/deleteIcon.png';

const { width, height } = Dimensions.get('screen');

const Payments = ({ navigation }) => {
  const [PaymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      accountNo: 1234564567788976,
      accountHolderName: 'Haseeb Ahmed',
      expMonth: 11,
      expYear: 21,
      cvc: 245
    }
  ]);

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
        PAYMENTS
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

      <LinearGradient
        colors={['#006BDA', '#2C88EA', '#407BFF']}
        style={{
          marginHorizontal: 20,
          width: width - 40,
          height: 180,
          justifyContent: 'center',
          borderRadius: 8
        }}
      >
        <Image
          source={simIcon}
          style={{
            width: 40,
            height: 40,
            tintColor: '#fff',
            position: 'absolute',
            top: 20,
            left: 30
          }}
        />
        <Image
          source={dollarIcon}
          style={{
            width: 50,
            height: 50,
            tintColor: '#fff',
            position: 'absolute',
            top: 20,
            right: 20
          }}
        />
        <Text
          style={{
            color: '#fff',
            fontFamily: FONTS.Poppins,
            fontSize: FONTS.subhead4,
            position: 'absolute',
            top: 80,
            left: 30
          }}
        >
          Haseeb Ahmed Saeed
        </Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 25,
            left: 30
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.subhead4,
              marginRight: 30
            }}
          >
            1234 2647 **** ****
          </Text>
          <Text
            style={{
              color: '#fff',
              fontFamily: FONTS.Poppins,
              fontSize: FONTS.subhead4
            }}
          >
            11 / 21
          </Text>
        </View>
      </LinearGradient>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          justifyContent: 'flex-end'
        }}
      >
        {/* Edit Icon */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: '#407BFF',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            marginRight: 10
          }}
        >
          <Image
            source={editIcon}
            style={{ width: 15, height: 15, tintColor: '#FFF' }}
          />
        </TouchableOpacity>
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
        >
          <Image
            source={deleteIcon}
            style={{ width: 20, height: 20, tintColor: '#FFF' }}
          />
        </TouchableOpacity>
      </View>

      <View style={{ marginHorizontal: 20, width: width - 40, marginTop: 30 }}>
        <TouchableOpacity
          style={{
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderBottomColor: '#e1e1e1',
            borderTopColor: '#e1e1e1',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Image
            source={addIcon}
            style={{ width: 25, height: 25, tintColor: '#407BFF' }}
          />
          <Text
            style={{ marginLeft: 5, fontSize: 14, fontFamily: FONTS.Poppins }}
          >
            Add Payment Method
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Payments;
