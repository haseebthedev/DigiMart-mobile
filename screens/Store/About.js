import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { Rating } from 'react-native-ratings';
import { FONTS } from '../../constants/index';
import laptopImage from '../../assets/images/laptop-image.png';
import addIcon from '../../assets/icons/addIcon.png';

const About = ({ navigation }) => {
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
          <Text style={styles.heading}>Description:</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </Text>
          <Text style={styles.heading}>Location:</Text>
          <Text style={styles.content}>Islamabad, Pakistan</Text>
          <Text style={styles.heading}>Contact:</Text>
          <Text style={styles.content}>Phone: +923455488210</Text>
          <Text style={styles.content}>Email: google@google.com</Text>
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
