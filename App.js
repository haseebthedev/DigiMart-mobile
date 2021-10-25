import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

// UserContext
// import ContextProvider from './contexts/UserContext';

// Navigation Stack
import StackScreens from './Navigation/StackScreens';

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <StackScreens />
    </NavigationContainer>
  );
};

export default App;
