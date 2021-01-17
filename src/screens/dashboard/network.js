/* eslint-disable */
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
