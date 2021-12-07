import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FONTS } from '../../constants/index';
import api from '../../axios/api';

const About = ({ route, navigation }) => {
  const { storeId } = route.params;
  const [storeInfo, setStoreInfo] = useState({
    name: '',
    biography: '',
    category: '',
    warehouseAddress: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    api
      .get(`/buyer/data/store/${storeId}`)
      .then((res) => {
        let { country, biography, name, category, warehouseAddress, city } =
          res.data.data.storeDetails;

        setStoreInfo({
          ...storeInfo,
          country,
          biography,
          name,
          category,
          warehouseAddress,
          city
        });
      })
      .catch((error) => console.log('Error: ', error));
  }, []);

  return (
    <View>
      <ScrollView>
        {/* PRODUCTS DEALS  */}
        <View
          style={{
            marginVertical: 20,
            paddingHorizontal: 20
          }}
        >
          <Text
            style={{
              fontFamily: FONTS.PoppinsBold,
              fontSize: 20
            }}
          >
            About Us
          </Text>
          <Text style={styles.heading}>Store Name:</Text>
          <Text style={styles.content}>{storeInfo.name}</Text>

          <Text style={styles.heading}>biography:</Text>
          <Text style={styles.content}>{storeInfo.biography}</Text>

          <Text style={styles.heading}>Location:</Text>
          <Text style={styles.content}>
            {storeInfo.city + ', ' + storeInfo.country}
          </Text>

          <Text style={styles.heading}>Address:</Text>
          <Text style={styles.content}>{storeInfo.warehouseAddress}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  heading: {
    fontFamily: FONTS.PoppinsBold,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5
  },
  content: { fontFamily: FONTS.Poppins, textAlign: 'justify' }
});

export default About;
