/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import TextBox from '../../components/TextBox';
import {signup} from './network';

const Signup = ({navigation}) => {
  const [signupAs, setSignupAs] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [dept, setDept] = useState(null);
  const [sec, setSec] = useState('NA');
  const [year, setYear] = useState(null);
  const [roll, setRoll] = useState(null);
  const [serviceId, setServiceId] = useState(null);

  useEffect(() => {}, [signupAs]);
  const setNameChange = (text) => {
    text.length ? setName(text) : setName(null);
  };
  const setUsernameChange = (text) => {
    text.length ? setUsername(text) : setUsername(null);
  };
  const setPasswordChange = (text) => {
    text.length ? setPassword(text) : setPassword(null);
  };
  const setConfirmPasswordChange = (text) => {
    text.length ? setConfirmPassword(text) : setConfirmPassword(null);
  };
  const setRollChange = (text) => {
    text.length ? setRoll(text) : setRoll(null);
  };
  const setServiceIdChange = (text) => {
    text.length ? setServiceId(text) : setServiceId(null);
  };

  const onPressLogin = () => {
    navigation.navigate('Login');
  };

  const onPressSignupProceed = async () => {
    if (!signupAs || !name || !username || !password || !confirmPassword)
      return;
    if (password !== confirmPassword) return;
    let data = {};
    if (signupAs === 'student') {
      if (!dept || !year || !roll) return;
      data = {
        fullname: name,
        username: username,
        password: password,
        dept: dept,
        sec: sec,
        year: year,
        roll: roll,
        signupAs: signupAs,
      };
    } else {
      if (!serviceId) return;
      data = {
        fullname: name,
        username: username,
        password: password,
        serviceId: serviceId,
        signupAs: signupAs,
      };
    }
    const signup_ = await signup(data);
    console.log('Signup response is ', signup_);
    if (signup_.success) {
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>Signup</Text>
      <TextBox
        placeholder={'Enter Full Name'}
        value={name}
        onChangeFunc={setNameChange}
      />
      <TextBox
        placeholder={'Enter Username'}
        value={username}
        onChangeFunc={setUsernameChange}
      />
      <TextBox
        placeholder={'Password'}
        value={password}
        onChangeFunc={setPasswordChange}
        secureText={true}
      />
      <TextBox
        placeholder={'Confirm Password'}
        value={confirmPassword}
        onChangeFunc={setConfirmPasswordChange}
        secureText={true}
      />
      <View style={{borderWidth: 0.5, borderColor: 'black'}}>
        <Picker
          selectedValue={signupAs}
          style={{
            height: 40,
            width: '100%',
            color: signupAs === null ? '#808080' : '#282828',
          }}
          mode={'dropdown'}
          onValueChange={(itemValue) => setSignupAs(itemValue)}>
          <Picker.Item label="Signup as" value={null} />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
      </View>
      {signupAs === 'student' ? (
        <>
          <View style={{borderWidth: 0.5, borderColor: 'black'}}>
            <Picker
              selectedValue={dept}
              style={{
                height: 40,
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
          <View style={{borderWidth: 0.5, borderColor: 'black'}}>
            <Picker
              selectedValue={sec}
              style={{
                height: 40,
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
          <View style={{borderWidth: 0.5, borderColor: 'black'}}>
            <Picker
              selectedValue={year}
              style={{
                height: 40,
                width: '100%',
                color: year === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setYear(itemValue)}>
              <Picker.Item label="Select Year" value={null} />
              <Picker.Item label="1st" value="1st" />
              <Picker.Item label="2nd" value="2nd" />
              <Picker.Item label="3rd" value="3rd" />
              <Picker.Item label="4th" value="4th" />
            </Picker>
          </View>
          <TextBox
            placeholder={'Roll No'}
            value={roll}
            onChangeFunc={setRollChange}
          />
        </>
      ) : null}
      {signupAs === 'teacher' ? (
        <>
          <TextBox
            placeholder={'Id no'}
            value={serviceId}
            onChangeFunc={setServiceIdChange}
          />
        </>
      ) : null}
      <TouchableOpacity onPress={onPressSignupProceed}>
        <View
          style={{
            margin: 10,
            padding: 5,
            backgroundColor: 'blue',
            width: '50%',
            alignSelf: 'center',
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Proceed</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin}>
        <View>
          <Text style={{textAlign: 'center'}}>Already Registered ? Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;
