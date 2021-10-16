import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Register from './screens/Register';
import Login from './screens/Login';
import Layout from './screens/Layout/Layout';
import ProductPage from './screens/ProductPage';
import Messages from './screens/Messages';
import Checkout from './screens/Checkout';
import Cart from './screens/Cart';
import Chat from './screens/Messages/Chat';

// Accounts Page
import Account from './screens/Account';
import LikedProducts from './screens/Account/LikedProducts';
import StoresFollowed from './screens/Account/StoresFollowed';
// Orders
import DeliveredOrders from './screens/Account/MyOrders/DeliveredOrders';
import PendingOrders from './screens/Account/MyOrders/PendingOrders';
import ActiveOrders from './screens/Account/MyOrders/ActiveOrders';
import ReturnedOrders from './screens/Account/MyOrders/ReturnedOrders';
import CancelledOrders from './screens/Account/MyOrders/CancelledOrders';
// settings
import Settings from './screens/Account/Settings';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Layout"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Layout" component={Layout} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Cart" component={Cart} />

        {/* Accounts */}
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="LikedProducts" component={LikedProducts} />
        <Stack.Screen name="StoresFollowed" component={StoresFollowed} />
        <Stack.Screen name="Settings" component={Settings} />
        {/* SubPages */}
        <Stack.Screen name="DeliveredOrders" component={DeliveredOrders} />
        <Stack.Screen name="PendingOrders" component={PendingOrders} />
        <Stack.Screen name="ActiveOrders" component={ActiveOrders} />
        <Stack.Screen name="ReturnedOrders" component={ReturnedOrders} />
        <Stack.Screen name="CancelledOrders" component={CancelledOrders} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
