import React, {useContext, createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext({});

export const userCounter = () => useContext(UserContext);

const ContextProvider = ({children}) => {
  const [user, setUser] = useState({token: ''});

  // Manipulation functions
  const ADD_USER = payload => {
    setUser(payload);
  };

  const SIGN_OUT = () => {
    setUser({data: undefined});
  };

  async function fetchData() {
    let data = await AsyncStorage.getItem('DEMO_APP::COUNT_VALUE');
    setUser(JSON.parse(data));
  }

  // Fetching Data
  useEffect(() => {
    fetchData();
  }, []);

  // Saving Data
  useEffect(() => {
    AsyncStorage.setItem('DEMO_APP::COUNT_VALUE', JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider value={{user, ADD_USER, SIGN_OUT}}>
      {children}
    </UserContext.Provider>
  );
};

export default ContextProvider;
