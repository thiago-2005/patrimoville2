import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import { Map } from './screens/Map'
// import { Detail } from './screens/Detail'

import { Header } from './components/Header'
import { Home } from './screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="Map" component={Home} />
        <Screen name="Detail" component={Home} options={{
          headerShown: true,
          header: () => <Header showCancel={false} title="Local" />
        }}/>
      </Navigator>
    </NavigationContainer>
  )
}