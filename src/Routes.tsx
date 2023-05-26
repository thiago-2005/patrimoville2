import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Map } from './screens/Map'
import { Detail } from './screens/Detail'

import { Header } from './components/Header'

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen name="Map" component={Map} />
        <Screen name="Detail" component={Detail} options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Local" />
        }}/>
      </Navigator>
    </NavigationContainer>
  )
}