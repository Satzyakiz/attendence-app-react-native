/* eslint-disable */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import TextBox from '../../components/TextBox';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {QRGenerator} from '../qr';

const TeacherDashboard = ({navigation, subjectData, userDetails}) => {
  const [selectedSub, setSelectedSub] = useState(null);
  const [date, setDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [qrValue, setQRValue] = useState('');

  useEffect(() => {}, [showQr]);

  const onTeacherPress = () => {
    console.log('Pressed');
    if (!date || !selectedSub) return;
    let val = JSON.parse(selectedSub);
    val = {
      ...val,
      date: moment(date).format('DD-MM-YYYY'),
      teacherName: userDetails.fullname,
    };
    val = JSON.stringify(val);
    console.log(val);
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

  return (
    <>
      <View>
        <Text style={{textAlign: 'center'}}> Teacher Dashboard</Text>
        <View style={{borderWidth: 0.5, borderColor: 'black'}}>
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
            {subjectData.map((item) => {
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
            style={{color: 'black', borderWidth: 0.5}}
          />
        </TouchableOpacity>
        <TextBox
          value={userDetails?.fullname ? userDetails.fullname : ''}
          editable={false}
          style={{color: 'black', borderWidth: 0.5}}
        />
        <TextBox
          value={userDetails?.serviceId ? userDetails.serviceId : ''}
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

export default TeacherDashboard;
