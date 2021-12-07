import React, { useState, useEffect, useLayoutEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from '../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import Register from '.././screens/Register';
import Login from '.././screens/Login';
import Layout from '.././screens/Layout/Layout';
import ProductPage from '.././screens/ProductPage';
import Messages from '.././screens/Messages';
// import Cart from '.././screens/Cart';
import Checkout from '.././screens/Checkout/Checkout';
import Chat from '.././screens/Messages/Chat';
import Store from '.././screens/Store/Store';

// Homepage
import AllCategories from '../screens/Homepage/AllCategories';
import SubCategories from '../screens/Homepage/SubCategories';
import SearchedProducts from '../screens/Homepage/SearchedProducts';

// Accounts Page
import Account from '.././screens/Account';
import LikedProducts from '.././screens/Account/LikedProducts';
import StoresFollowed from '.././screens/Account/StoresFollowed';
// Orders
import DeliveredOrders from '.././screens/Account/MyOrders/DeliveredOrders';
import PendingOrders from '.././screens/Account/MyOrders/PendingOrders';
import ActiveOrders from '.././screens/Account/MyOrders/ActiveOrders';
import ReturnedOrders from '.././screens/Account/MyOrders/ReturnedOrders';
import CancelledOrders from '.././screens/Account/MyOrders/CancelledOrders';
// Services
import Reviews from '.././screens/Account/MyServices/Reviews';
import Payments from '.././screens/Account/MyServices/Payments';
import ReportProblem from '.././screens/Account/MyServices/ReportProblem';
import Support from '.././screens/Account/MyServices/Support';
// settings
import Settings from '.././screens/Account/Settings/Settings';
import AccountInfo from '.././screens/Account/Settings/AccountInfo';
import AddressBook from '.././screens/Account/Settings/AddressBook';
import FAQ from '.././screens/Account/Settings/FAQ';
import PrivacyPolicy from '.././screens/Account/Settings/PrivacyPolicy';
import SearchAndFilter from '.././screens/SearchAndFilter/SearchAndFilter';

const Stack = createNativeStackNavigator();

const StackScreens = () => {
  const { user } = UserContext();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={!user.token ? 'Login' : 'Layout'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* <Stack.Screen name="Messages" component={Messages} /> */}
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Chat" component={Chat} />
      {/* <Stack.Screen name="Cart" component={Cart} /> */}
      <Stack.Screen name="Layout" component={Layout} />
      <Stack.Screen name="AllCategories" component={AllCategories} />
      <Stack.Screen name="SubCategories" component={SubCategories} />
      <Stack.Screen name="SearchedProducts" component={SearchedProducts} />
      {/* <Stack.Screen name="Account" component={Account} /> */}
      <Stack.Screen name="LikedProducts" component={LikedProducts} />
      <Stack.Screen name="StoresFollowed" component={StoresFollowed} />
      <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
      <Stack.Screen name="PendingOrders" component={PendingOrders} />
      <Stack.Screen name="ActiveOrders" component={ActiveOrders} />
      <Stack.Screen name="ReturnedOrders" component={ReturnedOrders} />
      <Stack.Screen name="CancelledOrders" component={CancelledOrders} />
      <Stack.Screen name="Reviews" component={Reviews} />
      <Stack.Screen name="Payments" component={Payments} />
      <Stack.Screen name="ReportProblem" component={ReportProblem} />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="AccountInfo" component={AccountInfo} />
      <Stack.Screen name="AddressBook" component={AddressBook} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="Store" component={Store} />
      <Stack.Screen name="SearchAndFilter" component={SearchAndFilter} />
    </Stack.Navigator>
  );
};

export default StackScreens;
