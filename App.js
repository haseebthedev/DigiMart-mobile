import React from 'react';
import { StatusBar } from 'react-native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import UserProvider from './contexts/UserContext';
import CartProvider from './contexts/CartContext';
import { FONTS, COLORS } from './constants/index';

// Navigation Stack
import StackScreens from './Navigation/StackScreens';

const theme = {
  ...DefaultTheme,
  roundness: 6,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    placeholder: 'grey',
    background: '#f1f1f1'
  },
  fonts: configureFonts({
    android: {
      regular: {
        fontFamily: 'Poppins-Regular'
      },
      medium: {
        fontFamily: 'Poppins-Regular'
      },
      light: {
        fontFamily: 'Poppins-Regular'
      },
      thin: {
        fontFamily: 'Poppins-Regular'
      }
    }
  })
};

const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        {/* Theme Provider */}
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <StackScreens />
          </NavigationContainer>
        </PaperProvider>
      </CartProvider>
    </UserProvider>
  );
};

export default App;
