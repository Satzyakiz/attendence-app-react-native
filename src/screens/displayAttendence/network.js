/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../../services/Api';

export const getAttendenceList = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let data = JSON.stringify({
    subjectCode: d.subjectCode,
    teacherName: d.teacherName,
  });
  //   console.log('Data in update network', data);
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.getAttendenceList}`, requestOptions);
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
