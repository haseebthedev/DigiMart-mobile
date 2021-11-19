import React, { useContext, createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext({});

export const CartContext = () => useContext(Context);

const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  // Manipulation Functions
  const ADD_ITEM = (products) => {
    setCartList(products);
  };

  // Fetching Data
  async function fetchData() {
    let data = await AsyncStorage.getItem('DIGI-MART:CART');
    if (data !== null) {
      setCartList(JSON.parse(data));
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Saving Data
  useEffect(() => {
    AsyncStorage.setItem('DIGI-MART:CART', JSON.stringify(cartList));
  }, [cartList]);

  return (
    <Context.Provider value={{ cartList, ADD_ITEM }}>
      {children}
    </Context.Provider>
  );
};

export default CartProvider;
