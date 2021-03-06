/* eslint-disable */

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const ErrorPage = ({hide}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text>Some unexpected error occured</Text>
      <TouchableOpacity onPress={hide}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorPage;
