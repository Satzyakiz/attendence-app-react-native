/* eslint-disable */
import React from 'react';
import {View, Text, TextInput} from 'react-native';

const TextBox = ({
  placeholder,
  value,
  onChangeFunc,
  errText,
  secureText,
  ...props
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => onChangeFunc(text)}
        secureTextEntry={secureText}
        {...props}
      />
      {errText ? <Text>{errText}</Text> : null}
    </>
  );
};

export default TextBox;
