import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// UserContext
import ContextProvider from './contexts/UserContext';

// Navigation Stack
import StackScreens from './Navigation/StackScreens';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <StackScreens />
      </NavigationContainer>
    </ContextProvider>
  );
};

export default App;
