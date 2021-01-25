/* eslint-disable */

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {update} from './network';
import Styles from './style';
import Toast from '../../components/Toast';

const UpdateProfile = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [fullname, setFullname] = useState(null);
  const [username, setUsername] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [dept, setDept] = useState(null);
  const [sec, setSec] = useState('NA');
  const [year, setYear] = useState(null);
  const [roll, setRoll] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoader(true);
    let user_ = await AsyncStorage.getItem('User');
    user_ = JSON.parse(user_);
    console.log('USer details in update: ', user_);
    setUserDetails(user_);
    setFullname(user_.fullname);
    setUsername(user_.username);
    if (user_.serviceId && user_.serviceId !== undefined) {
      setUser('teacher');
      setServiceId(user_.serviceId);
    } else {
      setUser('student');
      setDept(user_.dept);
      setSec(user_.sec);
      setYear(user_.year);
      setRoll(user_.roll);
    }
    setLoader(false);
  };

  const onPressMakeChanges = async () => {
    if (!user || !fullname || !username) {
      Toast('Please fill all the fields', 0, -100);
      return;
    }

    if (user === 'teacher') {
      if (!serviceId) {
        Toast('Please fill all the fields', 0, -100);
        return;
      }
      let data = {
        fullname: fullname,
        username: username,
        password: userDetails.password,
        serviceId: serviceId,
        updateAs: 'teacher',
      };
      const update_ = await update(data);
      if (!update_.success) {
        console.log('Failed');
        Toast('Failed to update data', 0, -100, 'long');
      } else {
        console.log('Success');
        Toast('Successfully updated data', 1, -100, 'long');
        navigation.navigate('Dashboard');
      }
    } else {
      if (!roll || !dept || !sec || !year) {
        Toast('Please fill all the fields', 0, -100);
        return;
      }
      let data = {
        fullname: fullname,
        username: username,
        password: userDetails.password,
        dept: dept,
        sec: sec,
        year: year,
        roll: roll,
        updateAs: 'student',
      };
      setLoader(true);
      const update_ = await update(data);
      if (!update_.success) {
        console.log('Failed');
        Toast('Failed to update data', 0, -100, 'long');
      } else {
        console.log('Success');
        Toast('Successfully updated data', 1, -100, 'long');
        navigation.navigate('Dashboard');
      }
      setLoader(false);
    }
  };
  const setFullnameChange = (text) => {
    text.length ? setFullname(text) : setFullname(null);
  };
  const setUsernameChange = (text) => {
    text.length ? setUsername(text) : setUsername(null);
  };
  const setServiceIdChange = (text) => {
    text.length ? setServiceId(text) : setServiceId(null);
  };
  const setRollChange = (text) => {
    text.length ? setRoll(text) : setRoll(null);
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
        placeholder="Fullname"
        value={fullname}
        onChangeFunc={setFullnameChange}
        label="Username"
      />
      <TextBox
        placeholder="Username"
        value={username}
        onChangeFunc={setUsernameChange}
        label="Username"
      />
      {user === 'teacher' ? (
        <>
          <TextBox
            placeholder="Service Id"
            value={serviceId}
            onChangeFunc={setServiceIdChange}
            label="Service ID"
          />
        </>
      ) : (
        <>
          <Text style={Styles.labelStyle}>Department</Text>
          <View style={Styles.pickerStyle}>
            <Picker
              selectedValue={dept}
              style={{
                height: 50,
                width: '100%',
                color: dept === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setDept(itemValue)}>
              <Picker.Item label="Select Dept" value={null} />
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="IT" value="IT" />
              <Picker.Item label="ECE" value="ECE" />
              <Picker.Item label="EE" value="EE" />
            </Picker>
          </View>
          <Text style={Styles.labelStyle}>Section</Text>
          <View style={Styles.pickerStyle}>
            <Picker
              selectedValue={sec}
              style={{
                height: 50,
                width: '100%',
                color: sec === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setSec(itemValue)}>
              <Picker.Item label="Select Section" value={'NA'} />
              <Picker.Item label="NA" value={'NA'} />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
            </Picker>
          </View>
          <Text style={Styles.labelStyle}>Year</Text>
          <View style={Styles.pickerStyle}>
            <Picker
              selectedValue={year}
              style={{
                height: 50,
                width: '100%',
                color: year === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setYear(itemValue)}>
              <Picker.Item label="Select Year" value={null} />
              <Picker.Item label="1st" value="1" />
              <Picker.Item label="2nd" value="2" />
              <Picker.Item label="3rd" value="3" />
              <Picker.Item label="4th" value="4" />
            </Picker>
          </View>
          <TextBox
            placeholder="Roll"
            value={roll}
            onChangeFunc={setRollChange}
            label="Roll no"
          />
        </>
      )}
      <TouchableOpacity style={Styles.buttonStyle} onPress={onPressMakeChanges}>
        <Text style={Styles.buttonTextStyle}>Make Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateProfile;
