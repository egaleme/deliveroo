import * as React from 'react';
import {View, StatusBar} from 'react-native';

import AppRoute from './navigation';
import {PRIMARY_COLOR} from './constants';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      <AppRoute />
    </>
  );
}
