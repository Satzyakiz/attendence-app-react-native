/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../services/Api';

export const getSubjects = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    let response = await fetch(`${Api.subject}`, requestOptions);
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
export const getTeachers = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  try {
    let response = await fetch(`${Api.teacher}`, requestOptions);
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

export const update = async (d) => {
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
  //   console.log('Data in update network', data);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.update}/${d.updateAs}`, requestOptions);
    let status = response.status;
    let json = await response.json();
    if (status === 200) {
      const remove = await AsyncStorage.removeItem('User');
      let setUser = await AsyncStorage.setItem('User', data);
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
