/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import {login, checkDevice} from './network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import Toast from '../../components/Toast';
import DeviceInfo from 'react-native-device-info';
import Styles from './style';

const Login = ({navigation}) => {
  const [loginAs, setLoginAs] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [loader, setLoader] = useState(null);
  const [securePassword, setSecurePassword] = useState(true);

  useEffect(() => {
    checkIfLoggedIn();
  }, []);
  useEffect(() => {}, [loader]);

  const checkIfLoggedIn = async () => {
    const user_ = await AsyncStorage.getItem('User');
    console.log('Checking if logged in : ', user_);
    if (user_) {
      navigation.navigate('Dashboard');
    }
    DeviceInfo.getMacAddress()
      .then((mac) => {
        console.log('MAC : ', mac);
      })
      .catch((err) => {
        console.log('Err is : ', err);
      });

    console.log(DeviceInfo.getUniqueId());
  };

  const setUsernameChange = (text) => {
    text.length ? setUsername(text) : setUsername(null);
  };
  const setPasswordChange = (text) => {
    text.length ? setPassword(text) : setPassword(null);
  };

  const onPressLoginProceed = async () => {
    if (!loginAs || !username || !password) {
      Toast('Please fill all the details', 0, -100, 'long');
      return;
    }
    setLoader(true);
    if (loginAs === 'student') {
      const checkDevice_ = await checkDevice({
        username: username,
        uniqueId: DeviceInfo.getUniqueId(),
      });
      console.log('Checkdevice: ', checkDevice_);
      if (!checkDevice_.success) {
        setLoader(false);
        Toast('Device already used by other user', 0, -100, 'long');
        return;
      }
    }

    const data = {
      username: username,
      password: password,
      loginAs: loginAs,
    };
    // console.log(data);
    // setLoader(true);
    const login_ = await login(data);
    console.log('Login response', login_);
    if (login_.success) {
      Toast('Successfully logged in', 1, -100);
      navigation.navigate('Dashboard');
    } else {
      Toast('Invalid username or password', 0, -100);
    }
    setLoader(false);
  };

  const onPressSignup = () => {
    navigation.navigate('Signup');
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
      <Text style={Styles.headingText}>Login</Text>
      <TextBox
        placeholder={'Enter Username'}
        value={username}
        onChangeFunc={setUsernameChange}
        label="Username"
      />
      <TextBox
        placeholder={'Enter Password'}
        value={password}
        onChangeFunc={setPasswordChange}
        secureText={securePassword}
        isPassword={true}
        passwordToggle={() => {
          setSecurePassword(!securePassword);
        }}
        label="Password"
      />
      <View style={Styles.pickerStyle}>
        <Picker
          selectedValue={loginAs}
          style={{
            height: 50,
            width: '100%',
            color: loginAs === null ? '#808080' : '#282828',
          }}
          mode={'dropdown'}
          onValueChange={(itemValue) => setLoginAs(itemValue)}>
          <Picker.Item label="Login as" value={null} />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
      </View>
      <TouchableOpacity onPress={onPressLoginProceed}>
        <View style={Styles.proceedBtnStyle}>
          <Text style={Styles.proceedBtnTxtStyle}>Proceed</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSignup}>
        <View>
          <Text style={Styles.alternateTxt}>Not Registered ? Signup</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
