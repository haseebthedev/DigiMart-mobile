import React, { useReducer, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

function userReducer(store = [], action) {
  console.log('action', action);

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...store,
        data: action.data,
        token: action.token,
        isAuthenticated: true
      };
    default:
      return store;
  }
}

function UserProvider({ children }) {
  const [store, dispatch] = useReducer(userReducer, {
    data: AsyncStorage.getItem('USER_DATA')
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

const loginUser = async (dispatch, data, token) => {
  try {
    AsyncStorage.setItem(
      'USER_DATA',
      JSON.stringify({
        data,
        token,
        isAuthenticated: true
      })
    );
    await dispatch({ type: 'LOGIN_SUCCESS', data, token });
  } catch (e) {
    console.log(e);
  }
};

export { UserProvider, useUserContext, loginUser };
