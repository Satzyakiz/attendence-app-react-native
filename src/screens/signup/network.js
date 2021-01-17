/* eslint-disable */
import Api from '../../services/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signup = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let data = {};
  if (d.signupAs === 'teacher') {
    data = JSON.stringify({
      fullname: d.fullname,
      username: d.username,
      password: d.password,
      serviceId: d.serviceId,
    });
  } else {
    data = JSON.stringify({
      fullname: d.fullname,
      username: d.username,
      password: d.password,
      dept: d.dept,
      sec: d.sec,
      year: d.year,
      roll: d.roll,
    });
  }
  //   console.log('Data in signup network', data);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.signup}/${d.signupAs}`, requestOptions);
    let status = response.status;
    let json = await response.json();
    if (status === 201) {
      const store_ = await AsyncStorage.setItem(
        'User',
        JSON.stringify(json.data),
      );
      // console.log('Stored in AsyncStorage');
      // const getItem_ = await AsyncStorage.getItem('User');
      // console.log('Getting User ', JSON.parse(getItem_));
    }
    return {
      success: status === 201 ? 1 : 0,
      data: json,
    };
  } catch (data) {
    return {
      success: 0,
      data,
    };
  }
};
