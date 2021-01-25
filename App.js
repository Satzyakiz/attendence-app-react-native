/* eslint-disable */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {RootSiblingParent} from 'react-native-root-siblings';

import ApplicationNavigator from './src/Navigator';

const App = () => {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <ApplicationNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 20,
    height: '100%',
    backgroundColor: 'yellow',
  },
});

export default App;
