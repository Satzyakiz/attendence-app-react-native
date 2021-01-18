/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, LogBox} from 'react-native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import QRCode from 'react-native-qrcode-svg';
import QRCodeScanner from 'react-native-qrcode-scanner';

export const QRGenerator = ({value, hide}) => {
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

export const QRScanner = ({hide}) => {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }, []);
  useEffect(() => {}, [loader]);

  const onSuccess = (e) => {
    //   Linking.openURL(e.data).catch((err) =>
    //     console.error('An error occured', err),
    //   );
    console.log('Read Data', e);
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
      hide();
    }, 5000);
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
