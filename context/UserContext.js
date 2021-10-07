import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

function userReducer(store = [], action) {
  switch (action.type) {
    case 'REGISTER':
      return {
        ...store,
        isAuthenticated: true,
        data: { data: action.data, token: action.token }
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function UserProvider({ children }) {
  const [store, dispatch] = useReducer(userReducer, {
    isAuthenticated: !!JSON.parse(AsyncStorage.getItem('USER_DATA')),
    data: JSON.parse(AsyncStorage.getItem('USER_DATA'))
  });

  const value = { store, dispatch };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}

export { UserProvider, useUserContext };
