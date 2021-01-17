/* eslint-disable */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import {login} from './network';

const Login = ({navigation}) => {
  const [loginAs, setLoginAs] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const setUsernameChange = (text) => {
    text.length ? setUsername(text) : setUsername(null);
  };
  const setPasswordChange = (text) => {
    text.length ? setPassword(text) : setPassword(null);
  };

  const onPressLoginProceed = async () => {
    if (!loginAs || !username || !password) {
      console.log('Please fill all the details');
      return;
    }
    const data = {
      username: username,
      password: password,
      loginAs: loginAs,
    };
    // console.log(data);
    const login_ = await login(data);
    console.log('Login response', login_);
    if (login_.success) navigation.navigate('Dashboard');
  };

  const onPressSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>Login</Text>
      <TextBox
        placeholder={'Enter Username'}
        value={username}
        onChangeFunc={setUsernameChange}
      />
      <TextBox
        placeholder={'Enter Password'}
        value={password}
        onChangeFunc={setPasswordChange}
        secureText={true}
      />
      <View style={{borderWidth: 0.5, borderColor: 'black'}}>
        <Picker
          selectedValue={loginAs}
          style={{
            height: 40,
            width: '100%',
            color: loginAs === null ? '#808080' : '#282828',
          }}
          mode={'dropdown'}
          onValueChange={(itemValue) => setLoginAs(itemValue)}>
          <Picker.Item label="Signup as" value={null} />
          <Picker.Item label="Student" value="student" />
          <Picker.Item label="Teacher" value="teacher" />
        </Picker>
      </View>
      <TouchableOpacity onPress={onPressLoginProceed}>
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
      <TouchableOpacity onPress={onPressSignup}>
        <View>
          <Text style={{textAlign: 'center'}}>Not Registered ? Signup</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
