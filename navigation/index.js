import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import List from '../screens/List';
import Detail from '../screens/Detail';

const Stack = createStackNavigator();

const StackNavigator = props => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={List} name="List" />
      <Stack.Screen component={Detail} name="Detail" />
    </Stack.Navigator>
  );
};

const AppRoute = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default AppRoute;
