import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';

// Icons...
import menu from '../../assets/icons/menuIcon.png';
import close from '../../assets/icons/closemenuIcon.png';
import homeIcon from '../../assets/icons/homeIcon.png';
import chatIcon from '../../assets/icons/chatIcon.png';
import cartIcon from '../../assets/icons/cartIcon.png';
import accountIcon from '../../assets/icons/accountIcon.png';
import logoutIcon from '../../assets/icons/logoutIcon.png';
import searchIcon from '../../assets/icons/searchIcon.png';
import scanIcon from '../../assets/icons/scanIcon.png';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FONTS, COLORS, IMAGES } from '../../constants/index';

// Images
import myImage from '../../assets/images/myImage.jpg';

// MainScreens
import Homepage from '../Homepage';
import Messages from '../Messages';
import Cart from '../Cart';
import Account from '../Account';

const Tab = createMaterialBottomTabNavigator();

const Layout = ({ navigation }) => {
  // State
  const [currentTab, setCurrentTab] = useState('Homepage');
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // Animation Functions
  const drawerAnimation = () => {
    Animated.timing(scaleValue, {
      toValue: showMenu ? 1 : 0.88,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(offsetValue, {
      toValue: showMenu ? 0 : 230,
      duration: 300,
      useNativeDriver: true
    }).start();

    Animated.timing(closeButtonOffset, {
      toValue: !showMenu ? -30 : 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <View
          style={{
            marginTop: 40
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={myImage}
              style={{
                width: 75,
                height: 75,
                borderRadius: 8,
                borderWidth: 3,
                borderColor: '#fff'
              }}
            />
            <Text
              style={{
                fontFamily: FONTS.PoppinsBold,
                color: '#fff',
                marginTop: 10
              }}
            >
              Haseeb Ahmed
            </Text>
            <Text
              style={{
                fontFamily: FONTS.Poppins,
                fontSize: 10,
                color: '#fff',
                marginBottom: 15
              }}
            >
              haseeb@gmail.com
            </Text>
          </View>
          {TabButton(
            currentTab,
            setCurrentTab,
            'Homepage',
            homeIcon,
            navigation
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Messages',
            chatIcon,
            navigation
          )}

          {TabButton(currentTab, setCurrentTab, 'Cart', cartIcon, navigation)}

          {TabButton(
            currentTab,
            setCurrentTab,
            'Account',
            accountIcon,
            navigation
          )}
          {TabButton(
            currentTab,
            setCurrentTab,
            'Login',
            logoutIcon,
            navigation
          )}
        </View>
      </View>

      {/* TAB SCREEN HERE */}
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          borderRadius: showMenu ? 10 : 0,
          transform: [{ scale: scaleValue }, { translateX: offsetValue }]
        }}
        elevation={2}
      >
        <Animated.View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity
              onPress={() => {
                drawerAnimation();
                setShowMenu(!showMenu);
              }}
            >
              <Image
                source={showMenu ? close : menu}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: 'black'
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                width: 240,
                height: 30,
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
                  fontSize: 12,
                  marginTop: -5,
                  marginBottom: -10,
                  fontFamily: FONTS.Poppins
                }}
              />
            </View>
            <Image
              source={myImage}
              style={{
                width: 30,
                height: 30,
                borderRadius: 15
              }}
            />
          </View>
        </Animated.View>

        {/* TAB NAVIGATION */}
        <Tab.Navigator
          activeColor="#407BFF"
          inactiveColor="#B2B2B2"
          labeled={false}
          barStyle={{ backgroundColor: '#fff' }}
        >
          <Tab.Screen
            name="Homepage"
            component={Homepage}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={homeIcon}
                  style={{ width: 25, height: 25, tintColor: color }}
                />
              )
            }}
          />
          <Tab.Screen
            name="Messages"
            component={Messages}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={chatIcon}
                  style={{ width: 25, height: 25, tintColor: color }}
                />
              ),
              tabBarBadge: 13
            }}
          />
          <Tab.Screen
            name="Cart"
            component={Cart}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={cartIcon}
                  style={{ width: 25, height: 25, tintColor: color }}
                />
              ),
              tabBarBadge: 2
            }}
          />
          <Tab.Screen
            name="Account"
            component={Account}
            options={{
              tabBarIcon: ({ color }) => (
                <Image
                  source={accountIcon}
                  style={{ width: 25, height: 25, tintColor: color }}
                />
              )
            }}
          />
        </Tab.Navigator>
      </Animated.View>
    </SafeAreaView>
  );
};

// For Drawer
const TabButton = (currentTab, setCurrentTab, title, image, navigation) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (title === 'Login') {
          navigation.navigate('Login');
        } else {
          setCurrentTab(title);
          navigation.navigate(title);
        }
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 8,
          backgroundColor: currentTab == title ? 'white' : 'transparent',
          paddingLeft: 13,
          paddingRight: 35,
          borderRadius: 5,
          marginTop: 15
        }}
      >
        <Image
          source={image}
          style={{
            width: 20,
            height: 20,
            tintColor: currentTab == title ? '#407BFF' : 'white'
          }}
        />

        <Text
          style={{
            paddingLeft: 15,
            fontFamily: FONTS.PoppinsBold,
            fontSize: 12,
            color: currentTab == title ? '#407BFF' : 'white'
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#407BFF',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});

export default Layout;
