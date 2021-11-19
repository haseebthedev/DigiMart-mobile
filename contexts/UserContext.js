import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({});

export const UserContext = () => useContext(Context);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({ token: null });

  // Manipulation functions
  const ADD_USER = (payload) => {
    setUser({ token: payload });
  };

  const SIGN_OUT = () => {
    setUser({ token: null });
  };

  async function fetchData() {
    let data = await AsyncStorage.getItem('DIGI-MART:USER');
    setUser(JSON.parse(data));
  }

  // Fetching Data
  useEffect(() => {
    fetchData();
  }, []);

  // Saving Data
  useEffect(() => {
    AsyncStorage.setItem('DIGI-MART:USER', JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider value={{ user, ADD_USER, SIGN_OUT }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
