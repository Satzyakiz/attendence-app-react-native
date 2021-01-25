/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QRScanner} from '../qr';
import Styles from './style';

const StudentDashboard = ({navigation}) => {
  const [scanQr, setScanQr] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  useEffect(() => {
    apiCall();
  }, []);
  const apiCall = async () => {
    let res = await AsyncStorage.getItem('User');
    res = JSON.parse(res);
    console.log('Student details: ', res);
    setUserDetails(res);
  };
  const onStudentPress = () => {
    setScanQr(true);
  };
  return (
    <>
      <View>
        <TouchableOpacity
          onPress={onStudentPress}
          style={Styles.mainButtonStyle}>
          <Text style={Styles.mainButtonTextStyle}>Mark Attendence</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={scanQr}
            onRequestClose={() => {
              setScanQr(false);
            }}>
            <QRScanner user={userDetails} hide={() => setScanQr(false)} />
          </Modal>
        </View>
      </View>
    </>
  );
};

export default StudentDashboard;
