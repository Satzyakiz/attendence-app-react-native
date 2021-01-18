/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
// import TextBox from '../../components/TextBox';
// import {Picker} from '@react-native-picker/picker';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import moment from 'moment';
import {QRScanner} from '../qr';

const StudentDashboard = ({navigation, userDetails}) => {
  console.log(userDetails);
  const [scanQr, setScanQr] = useState(false);
  const onStudentPress = () => {
    setScanQr(true);
  };
  return (
    <>
      <View>
        <Text style={{textAlign: 'center'}}> Student Dashboard !</Text>
        <TouchableOpacity onPress={onStudentPress}>
          <Text style={{textAlign: 'center'}}>Mark Attendence</Text>
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
            <QRScanner hide={() => setScanQr(false)} />
          </Modal>
        </View>
      </View>
    </>
  );
};

export default StudentDashboard;
