/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getSubjects} from './network';
import moment from 'moment';

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

const TeacherDashboard = ({navigation, subjectData, userDetails}) => {
  const [selectedSubCode, setSelectedSubCode] = useState(null);
  const [date, setDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const onTeacherPress = () => {
    console.log('Pressed');
  };
  const showDatePicker = () => {
    setCalendarVisible(true);
  };
  const hideDatePicker = () => {
    setCalendarVisible(false);
  };
  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  return (
    <>
      <View>
        <Text style={{textAlign: 'center'}}> Teacher Dashboard</Text>
        <View style={{borderWidth: 0.5, borderColor: 'black'}}>
          <Picker
            selectedValue={selectedSubCode}
            style={{
              height: 40,
              width: '100%',
              color: selectedSubCode === null ? '#808080' : '#282828',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue) => setSelectedSubCode(itemValue)}>
            <Picker.Item label="Select Subject" value={null} />
            {subjectData.map((item) => {
              const label = `${item.subjectName} ( ${item.subjectCode} )`;
              const val = item.subjectCode;
              return <Picker.Item label={label} value={val} key={item._id} />;
            })}
          </Picker>
        </View>
        <TouchableOpacity onPress={showDatePicker}>
          <TextBox
            value={date ? moment(date).format('DD-MMM-YYYY') : 'Select Date'}
            editable={false}
            style={{color: 'black', borderWidth: 0.5}}
          />
        </TouchableOpacity>
        <TextBox
          value={userDetails.fullname}
          editable={false}
          style={{color: 'black', borderWidth: 0.5}}
        />
        <TextBox
          value={userDetails.serviceId}
          editable={false}
          style={{color: 'black', borderWidth: 0.5}}
        />
        <DateTimePickerModal
          isVisible={calendarVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity onPress={onTeacherPress}>
          <Text style={{textAlign: 'center'}}>Generate QR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const StudentDashboard = ({navigation, userDetails}) => {
  const onStudentPress = () => {
    console.log('Pressed');
  };
  return (
    <>
      <View>
        <Text style={{textAlign: 'center'}}> Student Dashboard !</Text>
        <TouchableOpacity onPress={onStudentPress}>
          <Text style={{textAlign: 'center'}}>Generate QR</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
