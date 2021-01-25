/* eslint-disable */
import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Bubbles, DoubleBounce, Bars, Pulse} from 'react-native-loader';
import {getAttendenceList} from './network';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import Styles from './style';

const DisplayAttendence = ({route, navigation}) => {
  const [loader, setLoader] = useState(false);
  const [attendenceData, setAttendenceData] = useState([]);
  const [totalClass, setTotalClass] = useState(null);
  const [hashMap, setHashMap] = useState(null);
  const [dept, setDept] = useState(null);
  const [sec, setSec] = useState('NA');

  useEffect(() => {
    apiCall();
  }, []);

  useEffect(() => {}, [hashMap, dept, sec]);

  const apiCall = async () => {
    setLoader(true);
    const routeData = JSON.parse(route.params.data);
    // console.log('Route data is ', routeData);
    const attendenceData_ = await getAttendenceList({
      subjectCode: routeData.subjectCode,
      teacherName: routeData.teacherName,
    });
    if (attendenceData_.success) {
      // console.log('Attendence Data is :', attendenceData_.data);

      // console.log(attendenceData_.data?.attendence);
      let fromDate = moment(routeData.fromDate).format('YYYY-MM-DD');
      let toDate = moment(routeData.toDate).format('YYYY-MM-DD');
      // console.log(fromDate, toDate);
      const filteredData = attendenceData_.data?.attendence.filter((item) => {
        let date = item.date.split('-').reverse().join('-');
        if (moment(date).isBetween(fromDate, toDate, undefined, '[]'))
          return item;
      });
      setAttendenceData(filteredData);
      // console.log('Filtered Data: ', filteredData);
      setTotalClass(filteredData.length);
      let hashMap_ = new Map();
      for (let i = 0; i < filteredData.length; i++) {
        const tempArr = filteredData[i].present;
        for (let j = 0; j < tempArr.length; j++) {
          if (hashMap_.has(tempArr[j].roll)) {
            let v = hashMap_.get(tempArr[j].roll).val;
            v += 1;
            let newObj = {studentObj: tempArr[j], val: v};
            hashMap_.set(tempArr[j].roll, newObj);
          } else {
            let newObj = {studentObj: tempArr[j], val: 1};
            hashMap_.set(tempArr[j].roll, newObj);
          }
        }
      }
      setHashMap(hashMap_);
    } else {
      console.log('Not found');
    }
    setLoader(false);
  };

  if (loader) {
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
  }

  const getMapData = () => {
    // console.log('Printing');
    let dataArr = [];

    for (const [key, value] of hashMap.entries()) {
      // console.log(key, value);
      if (dept) {
        if (value.studentObj.dept !== dept) continue;
        if (sec !== 'NA') {
          if (value.studentObj.sec !== sec) continue;
        }
      }
      const data = (
        <View
          key={key}
          style={{borderWidth: 2, marginVertical: 10, marginHorizontal: 5}}>
          <Text>Name: {value.studentObj.fullname}</Text>
          <Text>Roll: {value.studentObj.roll}</Text>
          <Text>Dept: {value.studentObj.dept}</Text>
          <Text>Section: {value.studentObj.sec}</Text>
          <Text>Attended Classes: {value.val}</Text>
        </View>
      );
      dataArr = [...dataArr, data];
    }
    return dataArr.map((item, index) => item);
  };
  return (
    <>
      <ScrollView>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{borderWidth: 0.5, borderColor: 'black'}}>
            <Picker
              selectedValue={dept}
              style={{
                height: 40,
                width: '100%',
                color: dept === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setDept(itemValue)}>
              <Picker.Item label="Select Dept" value={null} />
              <Picker.Item label="CSE" value="CSE" />
              <Picker.Item label="IT" value="IT" />
              <Picker.Item label="ECE" value="ECE" />
              <Picker.Item label="EE" value="EE" />
            </Picker>
          </View>
          <View style={{borderWidth: 0.5, borderColor: 'black'}}>
            <Picker
              selectedValue={sec}
              style={{
                height: 40,
                width: '100%',
                color: sec === null ? '#808080' : '#282828',
              }}
              mode={'dropdown'}
              onValueChange={(itemValue) => setSec(itemValue)}>
              <Picker.Item label="Select Section" value={'NA'} />
              <Picker.Item label="NA" value={'NA'} />
              <Picker.Item label="A" value="A" />
              <Picker.Item label="B" value="B" />
            </Picker>
          </View>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
          {hashMap ? getMapData() : null}
        </View>
      </ScrollView>
    </>
  );
};

export default DisplayAttendence;
