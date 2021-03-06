/* eslint-disable */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/login';
import Signup from '../screens/signup';
import Dashboard from '../screens/dashboard';
import ErrorPage from '../screens/error';
import UpdatePassword from '../screens/dashboard/UpdatePassword';
import UpdateProfile from '../screens/dashboard/UpdateProfile';
import DisplayAttendence from '../screens/displayAttendence';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ErrorPage" component={ErrorPage} />
      <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      <Stack.Screen name="DisplayAttendence" component={DisplayAttendence} />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
