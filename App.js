import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Register from './screens/Register';
import Login from './screens/Login';
import Layout from './screens/Layout/Layout';
import ProductPage from './screens/ProductPage';
import Messages from './screens/Messages';
import Checkout from './screens/Checkout';

const Stack = createNativeStackNavigator();

const App = () => {
  // Hiding SplashScreen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Messages"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        {/* <Stack.Screen name="Messages" component={Messages} /> */}
        <Stack.Screen name="ProductPage" component={ProductPage} />
        <Stack.Screen name="Checkout" component={Checkout} />
        <Stack.Screen name="Layout" component={Layout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
