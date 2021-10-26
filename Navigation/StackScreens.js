import React, { useState, useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

// UserContext
// import { UserContext } from '.././contexts/UserContext';

// Screens
import Register from '.././screens/Register';
import Login from '.././screens/Login';
import Layout from '.././screens/Layout/Layout';
import ProductPage from '.././screens/ProductPage';
import Messages from '.././screens/Messages';
import Checkout from '.././screens/Checkout';
import Cart from '.././screens/Cart';
import Chat from '.././screens/Messages/Chat';
import Store from '.././screens/Store/Store';

// Homepage
import AllCategories from '../screens/HomepageMisc/AllCategories';

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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const StackScreens = () => {
  const [UserToken, setUserToken] = useState(null);

  const fetchUserState = async () => {
    try {
      const value = await AsyncStorage.getItem('@USER_TOKEN');
      if (value !== null) {
        setUserToken(value);
      }
    } catch (e) {
      console.log('Error :: ', e);
    }
  };

  useEffect(() => {
    fetchUserState();
    SplashScreen.hide();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName={'Layout'}
      // initialRouteName={UserToken !== null ? 'Layout' : 'Login'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="ProductPage" component={ProductPage} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Layout" component={Layout} />
      <Stack.Screen name="AllCategories" component={AllCategories} />

      {/* Accounts */}
      <Stack.Screen name="Account" component={Account} />
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
    </Stack.Navigator>
  );
};

export default StackScreens;
