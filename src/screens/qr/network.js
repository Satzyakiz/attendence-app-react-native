/* eslint-disable */
import Api from '../../services/Api';

export const createAttendenceSheet = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let data = JSON.stringify({
    subjectCode: d.subjectCode,
    subjectName: d.subjectName,
    teacherName: d.teacherName,
    date: d.date,
  });
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.createAttendenceSheet}`, requestOptions);
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

export const markAttendence = async (d) => {
  let myHeaders = {
    'Content-Type': 'application/json',
  };
  let data = JSON.stringify({
    subjectCode: d.subjectCode,
    subjectName: d.subjectName,
    teacherName: d.teacherName,
    user: d.user,
    date: d.date,
  });
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  try {
    let response = await fetch(`${Api.attendence}`, requestOptions);
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
