/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, LogBox} from 'react-native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ErrorPage from '../error';
import {createAttendenceSheet, markAttendence} from './network';
import Toast from '../../components/Toast';

export const QRGenerator = ({value, hide}) => {
  console.log('value in generator: ', value);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    if (!value) {
      Toast('Value not found', 0, -100);
    } else {
      const val = JSON.parse(value);
      const data = {
        subjectCode: val.subjectCode,
        subjectName: val.subjectName,
        teacherName: val.teacherName,
        date: val.date,
      };
      const create_ = await createAttendenceSheet(data);
      if (!create_.success) {
        Toast('Some error occured while creating attendence list', 0, -100);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      }}>
      <QRCode value={value} size={300} />
      <TouchableOpacity onPress={hide}>
        <Text style={{textAlign: 'center'}}>Exit</Text>
      </TouchableOpacity>
    </View>
  );
};

export const QRScanner = ({user, hide}) => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {}, [loader]);

  const onSuccess = (e) => {
    //   Linking.openURL(e.data).catch((err) =>
    //     console.error('An error occured', err),
    //   );
    // console.log('Read Data', e.data);
    setLoader(true);
    apiCall(e.data);
  };

  const apiCall = async (data) => {
    if (!data || !user) {
      Toast('Some error occured', 0, -100);
    } else {
      let val = JSON.parse(data);
      let data_ = {
        subjectCode: val.subjectCode,
        subjectName: val.subjectName,
        date: val.date,
        teacherName: val.teacherName,
        user: {
          fullname: user.fullname,
          username: user.username,
          roll: user.roll,
          dept: user.dept,
          sec: user.sec,
          year: user.year,
        },
      };
      const mark_ = await markAttendence(data_);
      if (mark_.success) {
        setLoader(false);
        Toast('Attendence marked successfully', 1, -100, '-long');
        hide();
      } else {
        Toast('Attendence was not marked successfully', 0, -100, '-long');
        setLoader(false);
      }
    }
  };

  if (loader)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {/* <Bubbles size={10} color="#FFF" /> */}
        <Bars size={20} color="#0078ff" />
        {/* <Pulse size={10} color="#52AB42" /> */}
        {/* <DoubleBounce size={10} color="#1CAFF6" /> */}
      </View>
    );

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <>
            <Text style={{fontSize: 20, fontWeight: '600'}}>
              {' '}
              Hold Steady ! Scanning
            </Text>
          </>
        }
        bottomContent={
          <TouchableOpacity
            onPress={hide}
            style={{
              marginTop: 15,
              backgroundColor: '#0078ff',
              padding: 10,
              width: '60%',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}>
              {' '}
              Exit{' '}
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
