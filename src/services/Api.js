/* eslint-disable */
export const url = 'https://attendence-app-final-year-proj.herokuapp.com';
// export const url = 'http://localhost:3000';

export default {
  baseUrl: url,
  login: url + '/login',
  signup: url + '/signup',
  update: url + '/update',
  attendence: url + '/attendence',
  subject: url + '/subject',
  teacher: url + '/teacher',
  createAttendenceSheet: url + '/attendence/createAttendenceSheet',
  getAttendenceList: url + '/attendence/getAttendenceList',
  deviceDetail: url + '/deviceDetail',
};
