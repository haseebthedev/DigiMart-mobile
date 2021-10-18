import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import addIcon from '../../../assets/icons/addIcon.png';
import editIcon from '../../../assets/icons/editIcon.png';
import deleteIcon from '../../../assets/icons/deleteIcon.png';
import directionIcon from '../../../assets/icons/directionIcon.png';

const { width, height } = Dimensions.get('screen');

const AddressBook = ({ navigation }) => {
  const [AddressDetails, setAddressDetails] = useState([
    {
      id: 1,
      buyerId: '328072sfdgfydst40',
      location: 'House # 284, Block-F Satellite Town, Islamabad'
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
        MY ADDRESS
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
          marginTop: 20,
          marginHorizontal: 20,
          width: width - 40,
          paddingVertical: 20,
          justifyContent: 'center',
          borderRadius: 8
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 220 }}
        >
          <Image
            source={directionIcon}
            style={{
              width: 40,
              height: 40,
              tintColor: '#fff',
              marginRight: 20,
              marginLeft: 20
            }}
          />
          <View>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 14
              }}
            >
              House # 284, Block-F Satellite Town, Islamabad
            </Text>
          </View>
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
            Add New Address
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

export default AddressBook;
