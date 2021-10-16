import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import { FONTS, COLORS, IMAGES } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import { DataTable } from 'react-native-paper';

const { width, height } = Dimensions.get('screen');

const ReturnedOrders = ({ navigation }) => {
  const [orderDetails, setOrderDetails] = useState([
    {
      id: 1,
      orderId: 'DM-124FN',
      amount: 43200,
      EstArrival: '21-Oct-2021',
      status: 'RETURNED'
    },
    {
      id: 2,
      orderId: 'DM-123JA',
      amount: 350,
      EstArrival: '28-Oct-2021',
      status: 'RETURNED'
    },
    {
      id: 3,
      orderId: 'DM-19QJA',
      amount: 740,
      EstArrival: '22-Oct-2021',
      status: 'RETURNED'
    },
    {
      id: 4,
      orderId: 'DM-423JA',
      amount: 1200,
      EstArrival: '24-Oct-2021',
      status: 'RETURNED'
    },
    {
      id: 5,
      orderId: 'DM-523JA',
      amount: 350,
      EstArrival: '26-Oct-2021',
      status: 'RETURNED'
    }
  ]);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontFamily: FONTS.PoppinsBold,
          fontSize: FONTS.subhead4,
          color: '#407BFF',
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 30
        }}
      >
        ORDERS (RETURNED)
      </Text>

      {/* Back Button */}
      <TouchableNativeFeedback onPress={() => navigation.goBack()}>
        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 15,
            position: 'absolute',
            top: 20,
            left: 20
          }}
        >
          <Image
            source={backIcon}
            style={{ width: 25, height: 25, tintColor: 'black' }}
          />
        </View>
      </TouchableNativeFeedback>

      <View style={{ marginTop: 30 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>
              <Text style={{ fontFamily: FONTS.Poppins, fontSize: 14 }}>
                Order #
              </Text>
            </DataTable.Title>
            <DataTable.Title>
              <Text style={{ fontFamily: FONTS.Poppins, fontSize: 14 }}>
                Amount
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{ fontFamily: FONTS.Poppins, fontSize: 14 }}>
                Est. Arrival
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text style={{ fontFamily: FONTS.Poppins, fontSize: 14 }}>
                Status
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {orderDetails.map((el, index) => (
            <DataTable.Row key={index}>
              <DataTable.Cell>
                <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
                  {el.orderId}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
                  Rs.{' ' + el.amount}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
                  {el.EstArrival}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  style={{
                    fontFamily: FONTS.Poppins,
                    fontSize: 12,
                    color: '#fff',
                    backgroundColor: 'red'
                  }}
                >
                  {el.status}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default ReturnedOrders;
