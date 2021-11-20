import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FONTS } from '../../constants/index';
import addIcon from '../../assets/icons/addIcon.png';
import chatIcon from '../../assets/icons/chatIcon.png';
import storeImage from '../../assets/images/google-logo.png';
import backBtnIcon from '../../assets/icons/backIcon.png';
import imageNotAvailable from '../../assets/images/imageNotAvailable.png';

// screens
import Homepage from './Homepage';
import AllProducts from './AllProducts';
import Reviews from './Reviews';
import About from './About';
import api from '../../axios/api';

const { width } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const Store = ({ route, navigation }) => {
  const { storeId } = route.params;

  const [storeDetails, setStoreDetails] = useState({
    name: '',
    countOfStoreSubscribers: 0,
    sumOfRatings: ''
  });

  useEffect(() => {
    api
      .get(`/buyer/data/store/${storeId}/mobile`)
      .then((res) => {
        let name = res.data.data.storeDetails.name;
        let logo = res.data.data.storeDetails.logo;
        let countOfStoreSubscribers = res.data.data.countOfStoreSubscribers;
        let sumOfRatings = res.data.data.sumOfRatings;
        setStoreDetails({ name, logo, countOfStoreSubscribers, sumOfRatings });
      })
      .catch((error) => console.log('Error: ', error));
  }, []);

  return (
    <React.Fragment>
      <StatusBar backgroundColor="#407BFF" />
      {/* Top Header */}
      <View
        style={{
          width: width,
          height: 60,
          backgroundColor: '#407BFF',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
          borderBottomWidth: 2,
          borderBottomColor: '#e1e1e1'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={backBtnIcon}
              style={{ width: 25, height: 25, tintColor: '#fff' }}
            />
          </TouchableOpacity>
          <Image
            source={
              storeDetails.logo
                ? {
                    uri: storeDetails.logo
                  }
                : imageNotAvailable
            }
            style={{
              width: 40,
              height: 40,
              borderRadius: 30,
              marginLeft: 3,
              backgroundColor: '#fff'
            }}
          />
          <View style={{ marginLeft: 15 }}>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.PoppinsBold,
                fontSize: 16
              }}
            >
              {storeDetails.name}
            </Text>
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                marginTop: -5
              }}
            >
              {storeDetails.sumOfRatings +
                ' Ratings - ' +
                storeDetails.countOfStoreSubscribers +
                ' Followers'}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
            <Image
              source={addIcon}
              style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 10
              }}
            >
              FOLLOW
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: 'center' }}>
            <Image
              source={chatIcon}
              style={{ width: 24, height: 24, tintColor: '#fff' }}
            />
            <Text
              style={{
                color: '#fff',
                fontFamily: FONTS.Poppins,
                fontSize: 10
              }}
            >
              CHAT
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigator */}
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="none"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: FONTS.Poppins },
          tabBarScrollEnabled: true,
          tabBarItemStyle: {
            width: 120
          }
        }}
      >
        <Tab.Screen
          name="Home page"
          component={Homepage}
          initialParams={{ storeId: storeId }}
        />
        <Tab.Screen
          name="All Products"
          component={AllProducts}
          initialParams={{ storeId: storeId }}
        />
        <Tab.Screen
          name="Reviews"
          component={Reviews}
          initialParams={{ storeId: storeId }}
        />
        <Tab.Screen
          name="About"
          component={About}
          initialParams={{ storeId: storeId }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};

export default Store;
