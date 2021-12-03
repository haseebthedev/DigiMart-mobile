import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  useLayoutEffect
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({});

export const UserContext = () => useContext(Context);

const UserProvider = ({ children }) => {
  // const [user, setUser] = useState({
  //   _id: '611901cf64d4413bd480b247',
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEwY2VkNjc5ZGJkMzAwMDRhMzIwYWEiLCJpYXQiOjE2Mzg1MjMwMDMsImV4cCI6MTYzOTEyNzgwM30.6mbIGgWBMk_BwfTmrznK5mnG0-mYisUqUwNDJ2ILTJU'
  // });

  const [user, setUser] = useState({
    _id: '',
    token: ''
  });

  // Manipulation functions
  const ADD_USER = (id, token) => {
    setUser({ _id: id, token: token });
  };

  const SIGN_OUT = () => {
    setUser({ _id: null, token: null });
  };

  async function fetchData() {
    let data = await AsyncStorage.getItem('DIGI-MART:USER');
    setUser(JSON.parse(data));
  }

  // Fetching Data
  useLayoutEffect(() => {
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

export default UserProvider;
