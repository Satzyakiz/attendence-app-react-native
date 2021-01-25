/* eslint-disable */
import Api from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    username: d.username,
    password: d.password,
  });
  console.log('Data in login network', data);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.login}/${d.loginAs}`, requestOptions);
    let status = response.status;
    let json = await response.json();
    if (status === 200) {
      const store_ = await AsyncStorage.setItem(
        'User',
        JSON.stringify(json.data),
      );
      // console.log('Stored in AsyncStorage');
      // const getItem_ = await AsyncStorage.getItem('User');
      // console.log('Getting User ', JSON.parse(getItem_));
    }
    return {
      success: status === 200 ? 1 : 0,
      data: json,
    };
  } catch (data) {
    return {
      success: 0,
      data,
    };
  }
};
export const checkDevice = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };

  let data = JSON.stringify({
    username: d.username,
    uniqueId: d.uniqueId,
  });

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.deviceDetail}`, requestOptions);
    let status = response.status;
    let json = await response.json();

    return {
      success: status === 200 ? 1 : 0,
      data: json,
    };
  } catch (data) {
    return {
      success: 0,
      data,
    };
  }
};
