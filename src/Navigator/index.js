/* eslint-disable */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../screens/login';
import Signup from '../screens/signup';
import Dashboard from '../screens/dashboard';

const Stack = createStackNavigator();

const ApplicationNavigator = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default ApplicationNavigator;
