import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import ContextProvider from './contexts/UserContext';

// Navigation Stack
import StackScreens from './Navigation/StackScreens';

const App = () => {
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
