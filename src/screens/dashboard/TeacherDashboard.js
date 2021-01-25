/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {QRGenerator} from '../qr';
import {getSubjects, getTeachers} from './network';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import Images from '../../assets/images';
import Styles from './style';
import Toast from '../../components/Toast';

const TeacherDashboard = ({navigation}) => {
  const [activity, setActivity] = useState(null);

  useEffect(() => {}, [activity]);

  const onPressTakeAttendence = () => {
    setActivity('TakeAttendence');
  };
  const onPressCheckAttendence = () => {
    setActivity('CheckAttendence');
  };
  const onPressBack = () => {
    setActivity(null);
  };

  if (activity === 'TakeAttendence') {
    return <TakeAttendence onPressBack={onPressBack} />;
  }

  if (activity === 'CheckAttendence') {
    return (
      <CheckAttendence onPressBack={onPressBack} navigation={navigation} />
    );
  }

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={onPressTakeAttendence}
          style={Styles.mainButtonStyle}>
          <Text style={Styles.mainButtonTextStyle}>Take Attendence</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressCheckAttendence}
          style={Styles.mainButtonStyle}>
          <Text style={Styles.mainButtonTextStyle}>Check Attendence</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TeacherDashboard;

const TakeAttendence = ({onPressBack}) => {
  const [selectedSub, setSelectedSub] = useState(null);
  const [date, setDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrValue, setQRValue] = useState('');
  const [userDetails, setUserDetails] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {}, [subjects, loader, showQr]);

  const apiCall = async () => {
    setLoader(true);
    let res = await AsyncStorage.getItem('User');
    res = JSON.parse(res);
    setUserDetails(res);
    const subjectResponse = await getSubjects();
    if (subjectResponse.success) {
      setSubjects(subjectResponse.data);
    } else {
      setLoader(false);
      Toast('Error in API call', 0, -100);
      return;
    }
    setLoader(false);
  };

  const onTeacherPress = () => {
    // console.log('Pressed');
    if (!date || !selectedSub) {
      Toast('Please select all the details', 0, -100);
      return;
    }
    let val = JSON.parse(selectedSub);
    val = {
      ...val,
      date: moment(date).format('DD-MM-YYYY'),
      teacherName: userDetails.fullname,
    };
    val = JSON.stringify(val);
    // console.log(val);
    setQRValue(val);
    setShowQr(true);
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

  if (loader)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {/* <Bubbles size={10} color="#FFF" /> */}
        <Bars size={20} color="#FDAAFF" />
        {/* <Pulse size={10} color="#52AB42" /> */}
        {/* <DoubleBounce size={10} color="#1CAFF6" /> */}
      </View>
    );

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPressBack} style={Styles.backArrowStyle}>
          <Image source={Images.backArrow} style={{height: 40, width: 60}} />
        </TouchableOpacity>
        <Text style={Styles.topicHeader}> Take Attendence</Text>
        <Text style={Styles.labelStyle}>Select Subject</Text>
        <View style={Styles.pickerStyle}>
          <Picker
            selectedValue={selectedSub}
            style={{
              height: 40,
              width: '100%',
              color: selectedSub === null ? '#808080' : '#282828',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue) => setSelectedSub(itemValue)}>
            <Picker.Item label="Select Subject" value={null} />
            {subjects.map((item) => {
              const label = `${item.subjectName} ( ${item.subjectCode} )`;
              const val = JSON.stringify({
                subjectCode: item.subjectCode,
                subjectName: item.subjectName,
              });
              return <Picker.Item label={label} value={val} key={item._id} />;
            })}
          </Picker>
        </View>
        <TouchableOpacity onPress={showDatePicker}>
          <TextBox
            value={date ? moment(date).format('DD-MMM-YYYY') : 'Select Date'}
            editable={false}
            textInputStyle={{
              color: date ? 'black' : '#808080',
            }}
            label="Select Date"
          />
        </TouchableOpacity>
        <TextBox
          value={userDetails?.fullname ? userDetails.fullname : ''}
          editable={false}
          label="Teacher Name"
        />
        <TextBox
          value={userDetails?.serviceId ? userDetails.serviceId : ''}
          editable={false}
          label="Service Id"
        />
        <DateTimePickerModal
          isVisible={calendarVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity onPress={onTeacherPress} style={Styles.buttonStyle}>
          <Text style={Styles.buttonTextStyle}>Generate QR</Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          }}>
          <Modal
            animationType="slide"
            // transparent={true}
            visible={showQr}
            onRequestClose={() => {
              setShowQr(false);
            }}>
            <QRGenerator value={qrValue} hide={() => setShowQr(false)} />
          </Modal>
        </View>
      </View>
    </>
  );
};

const CheckAttendence = ({onPressBack, navigation}) => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [fromCalendarVisible, setFromCalendarVisible] = useState(false);
  const [toCalendarVisible, setToCalendarVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    apiCall();
  }, []);

  const apiCall = async () => {
    setLoader(true);
    const subjectResponse = await getSubjects();
    if (subjectResponse.success) {
      setSubjects(subjectResponse.data);
    } else {
      setLoader(false);
      Toast('Error in API call', 0, -100);
      return;
    }
    const teacherResponse = await getTeachers();
    if (teacherResponse.success) {
      setTeachers(teacherResponse.data);
    } else {
      setLoader(false);
      Toast('Error in API call', 0, -100);
      return;
    }
    setLoader(false);
  };

  const showFromDatePicker = (type) => {
    setFromCalendarVisible(true);
  };
  const showToDatePicker = (type) => {
    setToCalendarVisible(true);
  };
  const hideDatePicker = () => {
    setToCalendarVisible(false);
    setFromCalendarVisible(false);
  };
  const handleFromDateConfirm = (date) => {
    setFromDate(date);
    hideDatePicker();
  };
  const handleToDateConfirm = (date) => {
    setToDate(date);
    hideDatePicker();
  };

  const onPressCheckAttendence = () => {
    // console.log('dates are ', fromDate, toDate);
    if (!fromDate || !toDate || !selectedSub || !selectedTeacher) {
      Toast('Please fill all the details', 0, -100);
      return;
    }

    navigation.navigate('DisplayAttendence', {
      data: JSON.stringify({
        fromDate: fromDate,
        toDate: toDate,
        subjectCode: selectedSub,
        teacherName: selectedTeacher,
      }),
    });
  };

  if (loader)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        {/* <Bubbles size={10} color="#FFF" /> */}
        <Bars size={20} color="#0078ff" />
        {/* <Pulse size={10} color="#52AB42" /> */}
        {/* <DoubleBounce size={10} color="#1CAFF6" /> */}
      </View>
    );

  return (
    <>
      <View>
        <TouchableOpacity onPress={onPressBack} style={Styles.backArrowStyle}>
          <Image source={Images.backArrow} style={{height: 40, width: 60}} />
        </TouchableOpacity>
        <Text style={Styles.topicHeader}> Check Attendence</Text>
        <Text style={Styles.labelStyle}>Select Subject</Text>
        <View style={Styles.pickerStyle}>
          <Picker
            selectedValue={selectedSub}
            style={{
              height: 60,
              width: '100%',
              color: selectedSub === null ? '#808080' : '#282828',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue) => setSelectedSub(itemValue)}>
            <Picker.Item label="Select Subject" value={null} />
            {subjects.map((item) => {
              const label = `${item.subjectName} ( ${item.subjectCode} )`;
              const val = item.subjectCode;
              return <Picker.Item label={label} value={val} key={item._id} />;
            })}
          </Picker>
        </View>

        <Text style={Styles.labelStyle}>Select Teacher</Text>
        <View style={Styles.pickerStyle}>
          <Picker
            selectedValue={selectedTeacher}
            style={{
              height: 60,
              width: '100%',
              color: selectedTeacher === null ? '#808080' : '#282828',
            }}
            mode={'dropdown'}
            onValueChange={(itemValue) => setSelectedTeacher(itemValue)}>
            <Picker.Item label="Select Teacher" value={null} />
            {teachers.map((item) => {
              const label = `${item.fullname}`;
              return <Picker.Item label={label} value={label} key={item._id} />;
            })}
          </Picker>
        </View>
        <TouchableOpacity onPress={showFromDatePicker}>
          <TextBox
            value={
              fromDate ? moment(fromDate).format('DD-MMM-YYYY') : 'Select Date'
            }
            editable={false}
            textInputStyle={{color: fromDate === null ? '#808080' : '#282828'}}
            label="From Date"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={showToDatePicker}>
          <TextBox
            value={
              toDate ? moment(toDate).format('DD-MMM-YYYY') : 'Select Date'
            }
            editable={false}
            textInputStyle={{color: toDate === null ? '#808080' : '#282828'}}
            label="To Date"
          />
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={fromCalendarVisible}
          mode="date"
          onConfirm={handleFromDateConfirm}
          onCancel={hideDatePicker}
        />
        <DateTimePickerModal
          isVisible={toCalendarVisible}
          mode="date"
          onConfirm={handleToDateConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity
          onPress={onPressCheckAttendence}
          style={Styles.buttonStyle}>
          <Text style={Styles.buttonTextStyle}>Check Attendence</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
