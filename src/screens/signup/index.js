/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import TextBox from '../../components/TextBox';
import {signup} from './network';
import Styles from './style';
import Toast from '../../components/Toast';

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
  const [loader, setLoader] = useState(false);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  useEffect(() => {}, [signupAs, loader]);

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
    if (!signupAs || !name || !username || !password || !confirmPassword) {
      Toast('Please fill all the details', 0, -100);
      return;
    }
    if (password !== confirmPassword) {
      Toast('Passwords do not match', 0, -100);
      return;
    }
    let data = {};
    if (signupAs === 'student') {
      if (!dept || !year || !roll) {
        Toast('Please select all the details', 0, -100);
        return;
      }
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
      if (!serviceId) {
        Toast('Please fill all the details', 0, -100);
        return;
      }
      data = {
        fullname: name,
        username: username,
        password: password,
        serviceId: serviceId,
        signupAs: signupAs,
      };
    }
    setLoader(true);
    const signup_ = await signup(data);
    console.log('Signup response is ', signup_);
    if (signup_.success) {
      Toast('Successfully signed up', 1, -100);
      navigation.navigate('Login');
    } else {
      Toast('Signup not successfull', 0, -100);
    }
    setLoader(false);
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
    <ScrollView>
      <View style={{marginTop: 50}}></View>
      <Text style={Styles.headingText}>Signup</Text>
      <TextBox
        placeholder={'Enter Full Name'}
        value={name}
        onChangeFunc={setNameChange}
        label="Fullname"
      />
      <TextBox
        placeholder={'Enter Username'}
        value={username}
        onChangeFunc={setUsernameChange}
        label="Username"
      />
      <TextBox
        placeholder={'Password'}
        value={password}
        onChangeFunc={setPasswordChange}
        secureText={securePassword}
        isPassword={true}
        passwordToggle={() => {
          setSecurePassword(!securePassword);
        }}
        label="Password"
      />
      <TextBox
        placeholder={'Confirm Password'}
        value={confirmPassword}
        onChangeFunc={setConfirmPasswordChange}
        secureText={secureConfirmPassword}
        isPassword={true}
        passwordToggle={() => {
          setSecureConfirmPassword(!secureConfirmPassword);
        }}
        label="Confirm Password"
      />
      <Text style={Styles.labelStyle}>Signup As</Text>
      <View style={Styles.pickerStyle}>
        <Picker
          selectedValue={signupAs}
          style={{
            height: 50,
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
            placeholder={'Roll No'}
            value={roll}
            onChangeFunc={setRollChange}
            label="Roll No"
          />
        </>
      ) : null}
      {signupAs === 'teacher' ? (
        <>
          <TextBox
            placeholder={'Id no'}
            value={serviceId}
            onChangeFunc={setServiceIdChange}
            label="Service Id"
          />
        </>
      ) : null}
      <TouchableOpacity
        onPress={onPressSignupProceed}
        style={Styles.proceedBtnStyle}>
        <Text style={Styles.proceedBtnTxtStyle}>Proceed</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressLogin} style={{marginBottom: 50}}>
        <Text style={Styles.alternateTxt}>Already Registered ? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Signup;
