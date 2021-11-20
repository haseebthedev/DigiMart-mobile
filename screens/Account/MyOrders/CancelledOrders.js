import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableNativeFeedback
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../axios/api';
import { DataTable } from 'react-native-paper';
import { FONTS } from '../../../constants/index';
import backIcon from '../../../assets/icons/backIcon.png';
import { UserContext } from '../../../contexts/UserContext';

const CancelledOrders = ({ navigation }) => {
  const { user } = UserContext();
  const [orderDetails, setOrderDetails] = useState([]);

  const getCancelledOrders = async () => {
    await api
      .get(`/buyer/orders/Cancelled`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then((res) => {
        setOrderDetails(res.data.data.orders);
      })
      .catch((error) => console.log('ERROR: Fetching Order Details!'));
  };

  useEffect(() => {
    getCancelledOrders();

    return () => {
      setOrderDetails([]);
    };
  }, []);

  function formatDate(d) {
    date = new Date(d);
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return (d = dd + '/' + mm + '/' + yyyy);
  }

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
        ORDERS (CANCELLED)
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
                  {el._id}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
                  Rs.{' ' + el.totalPrice}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text style={{ fontFamily: FONTS.Poppins, fontSize: 12 }}>
                  {formatDate(el.deliveryDate)}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text
                  style={{
                    fontFamily: FONTS.PoppinsBold,
                    fontSize: 12,
                    color: '#ff0a0a'
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

export default CancelledOrders;
