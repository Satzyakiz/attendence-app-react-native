/* eslint-disable */
import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
import Styles from './style';
import Toast from '../../components/Toast';

const Tab = createBottomTabNavigator();
const Dashboard = ({navigation}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#0078ff',
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
        labelStyle: {fontSize: 18, fontWeight: 'bold', marginBottom: 15},
      }}>
      <Tab.Screen name="Dashboard" component={HomeScreen} />
      <Tab.Screen name="User" component={UpdateScreen} />
    </Tab.Navigator>
  );
};

export default Dashboard;

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    let res = await AsyncStorage.getItem('User');
    res = JSON.parse(res);
    if (res.serviceId && res.serviceId !== undefined) {
      setUser('teacher');
    } else {
      setUser('student');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {user === 'teacher' ? (
        <TeacherDashboard navigation={navigation} />
      ) : (
        <StudentDashboard navigation={navigation} />
      )}
    </View>
  );
};
const UpdateScreen = ({navigation}) => {
  const onPressUpdatePassword = () => {
    navigation.navigate('UpdatePassword');
  };
  const onPressUpdateProfile = () => {
    navigation.navigate('UpdateProfile');
  };
  const onPressLogout = () => {
    AsyncStorage.removeItem('User');
    Toast('Successfull logged out', 1, -100, 'long');
    navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FadeInView>
        <TouchableOpacity
          onPress={onPressUpdateProfile}
          style={Styles.userButton}>
          <Text style={Styles.userButtonText}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressUpdatePassword}
          style={Styles.userButton}>
          <Text style={Styles.userButtonText}> Update Password </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLogout} style={Styles.userButton}>
          <Text style={Styles.userButtonText}>Logout</Text>
        </TouchableOpacity>
      </FadeInView>
    </View>
  );
};

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};
