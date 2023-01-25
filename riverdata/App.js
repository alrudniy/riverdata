import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabs from './components/tabs';

import RDStatesScreen from './components/RDStates';
import RDStateSitesScreen from './components/RDStateSites';
import RDSiteGaugesScreen from './components/RDSiteGauges';
import RDGaugeGraphScreen from './components/RDGaugeGraph';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="State Sites" component={RDStateSitesScreen} />
        <Stack.Screen name="Site Gauges" component={RDSiteGaugesScreen} />
        <Stack.Screen name="Gauge Graph" component={RDGaugeGraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;