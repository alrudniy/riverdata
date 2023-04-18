import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createAppContainer } from "react-navigation";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Tabs from './components/tabs';

import RDStatesScreen from './components/RDStates';
import RDStateSitesScreen from './components/RDStateSites';
import RDSiteGaugesScreen from './components/RDSiteGauges';
import RDGaugeGraphScreen from './components/RDGaugeGraph';

const Stack = createNativeStackNavigator();

function App() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }}/>
        <Stack.Screen name="State Sites" component={RDStateSitesScreen} />
        <Stack.Screen 
          name="Site Gauges" 
          component={RDSiteGaugesScreen} 
          options={{
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => {
                  setIsFavorited(!isFavorited);
                }}>
                <Icon name={isFavorited ? 'heart' : 'heart-outline'} size={30} color="#000" />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Gauge Graph" component={RDGaugeGraphScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
