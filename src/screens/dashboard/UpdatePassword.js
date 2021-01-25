/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBox from '../../components/TextBox';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {update} from './network';
import Styles from './style';
import Toast from '../../components/Toast';

const UpdatePassword = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmNewPassword, setConfirmNewPassword] = useState(null);
  const [loader, setLoader] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmNewPassword, setSecureConfirmNewPassword] = useState(
    true,
  );

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoader(true);
    let user_ = await AsyncStorage.getItem('User');
    user_ = JSON.parse(user_);
    setUser(user_);
    setLoader(false);
  };

  const setCurrentPasswordChange = (text) => {
    text.length ? setCurrent(text) : setCurrent(null);
  };
  const setNewPasswordChange = (text) => {
    text.length ? setNewPassword(text) : setNewPassword(null);
  };
  const setConfirmNewPasswordChange = (text) => {
    text.length ? setConfirmNewPassword(text) : setConfirmNewPassword(null);
  };

  const onPressSubmit = async () => {
    if (!current || !newPassword || !confirmNewPassword) {
      Toast('Please fill all the fields', 0, -100);
      return;
    }
    if (current === user.password && newPassword === confirmNewPassword) {
      setLoader(true);
      if (user.serviceId && user.serviceId !== undefined) {
        let data = {
          fullname: user.fullname,
          username: user.username,
          password: newPassword,
          serviceId: user.serviceId,
          updateAs: 'teacher',
        };
        const update_ = await update(data);
        if (!update_.success) {
        } else {
          navigation.navigate('Dashboard');
        }
      } else {
        let data = {
          fullname: user.fullname,
          username: user.username,
          password: newPassword,
          dept: user.dept,
          sec: user.sec,
          year: user.year,
          roll: user.roll,
          updateAs: 'student',
        };
        const update_ = await update(data);

        if (!update_.success) {
        } else {
          navigation.navigate('Dashboard');
        }
      }
      setLoader(false);
    } else {
      if (current !== user.password) {
        Toast('Current Password do not match', 0, -100);
      } else {
        Toast('New passwords do not match', 0, -100);
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
      <TextBox
        placeholder="Enter Current Password"
        value={current}
        onChangeFunc={setCurrentPasswordChange}
        label="Current Password"
        secureText={securePassword}
        isPassword={true}
        passwordToggle={() => {
          setSecurePassword(!securePassword);
        }}
      />
      <TextBox
        placeholder="New Password"
        value={newPassword}
        onChangeFunc={setNewPasswordChange}
        secureText={true}
        label="New Password"
        secureText={secureNewPassword}
        isPassword={true}
        passwordToggle={() => {
          setSecureNewPassword(!secureNewPassword);
        }}
      />
      <TextBox
        placeholder="Confirm New Password"
        value={confirmNewPassword}
        onChangeFunc={setConfirmNewPasswordChange}
        secureText={true}
        label="Confirm New Password"
        secureText={secureConfirmNewPassword}
        isPassword={true}
        passwordToggle={() => {
          setSecureConfirmNewPassword(!secureConfirmNewPassword);
        }}
      />
      <TouchableOpacity style={Styles.buttonStyle} onPress={onPressSubmit}>
        <Text style={Styles.buttonTextStyle}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdatePassword;
