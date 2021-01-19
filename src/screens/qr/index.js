/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, LogBox} from 'react-native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ErrorPage from '../error';
import {createAttendenceSheet, markAttendence} from './network';

export const QRGenerator = ({value, hide}) => {
  console.log('value in generator: ', value);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {}, [isError]);

  const apiCall = async () => {
    if (!value) {
      setIsError(true);
    } else {
      setIsError(false);
      const val = JSON.parse(value);
      const data = {
        subjectCode: val.subjectCode,
        subjectName: val.subjectName,
        teacherName: val.teacherName,
        date: val.date,
      };
      const create_ = await createAttendenceSheet(data);
      if (!create_.success) {
        setIsError(true);
      }
    }
  };

  if (isError)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <ErrorPage hide={hide} />
      </View>
    );

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
  const [isError, setIsError] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {}, [loader]);
  useEffect(() => {}, [isError]);

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
      setIsError(true);
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
        hide();
      } else {
        setLoader(false);
        setIsError(true);
      }
    }
  };

  if (isError) return <ErrorPage hide={hide} />;

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
        <Bars size={20} color="#FDAAFF" />
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
            <Text> Hold Steady ! Scanning</Text>
          </>
        }
        bottomContent={
          <TouchableOpacity onPress={hide}>
            <Text> Exit </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
