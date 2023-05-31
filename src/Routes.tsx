import React from 'react'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Text } from 'react-native'

import { Map } from './screens/Map'
import { Detail } from './screens/Detail'

import { Header } from './components/Header'
// import { Home } from './screens/Home';


export default function Routes() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" options={{ headerShown: false }} component={Map} />
        <Stack.Screen name="Detail" component={Detail} options={{
          header: () => <Header showCancel={false} title="Local" />
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}