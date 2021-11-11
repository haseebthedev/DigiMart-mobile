import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({});

export const UserContext = () => useContext(Context);

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTE5MDFjZjY0ZDQ0MTNiZDQ4MGIyNDciLCJpYXQiOjE2MzY2NTk5NzQsImV4cCI6MTYzNzI2NDc3NH0.htrBHSEDiOzMV9HPzVuef24gZwp4xOj0oAaUgctoEwQ'
  });

  // Manipulation functions
  const ADD_USER = (payload) => {
    setUser({ token: payload.token });
  };

  const SIGN_OUT = () => {
    setUser({ token: '' });
  };

  async function fetchData() {
    // let data = await AsyncStorage.getItem('DIGI-MART:USER');
    // setUser(JSON.parse(data));
    setUser({
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTE5MDFjZjY0ZDQ0MTNiZDQ4MGIyNDciLCJpYXQiOjE2MzY2NTk5NzQsImV4cCI6MTYzNzI2NDc3NH0.htrBHSEDiOzMV9HPzVuef24gZwp4xOj0oAaUgctoEwQ'
    });
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
