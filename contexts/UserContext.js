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
  //   _id: '61a0ced679dbd30004a320aa',
  //   token:
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEwY2VkNjc5ZGJkMzAwMDRhMzIwYWEiLCJpYXQiOjE2Mzg4OTc3ODUsImV4cCI6MTYzOTUwMjU4NX0.1UuDCtJtJWocfTuZgT6XMtF5L9YefMAauw0-xNIEW7E'
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
    setUser({ _id: '', token: '' });
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
