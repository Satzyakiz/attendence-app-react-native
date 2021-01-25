/* eslint-disable */
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../assets/images';

const TextBox = ({
  placeholder,
  value,
  onChangeFunc,
  errText,
  secureText,
  textInputViewStyle,
  textInputStyle,
  isPassword,
  passwordToggle,
  label,
  ...props
}) => {
  return (
    <View style={[styles.textInputView, textInputViewStyle]}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextInput
          placeholder={placeholder}
          value={value}
          style={[
            styles.textInputStyle,
            textInputStyle,
            {width: isPassword ? '90%' : '100%'},
          ]}
          onChangeText={(text) => onChangeFunc(text)}
          secureTextEntry={secureText}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={passwordToggle}>
            <Image
              source={secureText ? Images.eyeOpen : Images.eyeClose}
              style={{height: 30, width: 30, margin: 5}}
            />
          </TouchableOpacity>
        )}
      </View>
      {errText ? <Text>{errText}</Text> : null}
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  textInputView: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  textInputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 15,
    paddingVertical: 10,
    color: 'black',
    fontSize: 16,
  },
  labelStyle: {
    marginVertical: 5,
    marginLeft: 3,
    fontSize: 16,
  },
});
