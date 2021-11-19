import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserContext';
import CartProvider from './contexts/CartContext';

// Navigation Stack
import StackScreens from './Navigation/StackScreens';

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <StackScreens />
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
