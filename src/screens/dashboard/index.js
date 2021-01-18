/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSubjects} from './network';
import TeacherDashboard from './TeacherDashboard';
import StudentDashboard from './StudentDashboard';

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {}, [subjects]);

  const apiCall = async () => {
    let res = await AsyncStorage.getItem('User');
    res = JSON.parse(res);
    if (res.serviceId && res.serviceId !== undefined) {
      setUser('teacher');
    } else {
      setUser('student');
    }
    setUserDetails(res);
    const subjectResponse = await getSubjects();
    if (subjectResponse.success) {
      setSubjects(subjectResponse.data);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {user === 'teacher' ? (
        <TeacherDashboard
          navigation={navigation}
          subjectData={subjects}
          userDetails={userDetails}
        />
      ) : (
        <StudentDashboard navigation={navigation} userDetails={userDetails} />
      )}
    </View>
  );
};

export default Dashboard;
