import React, { useState, useEffect} from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RDStatesScreen from './components/RDStates';
import RDFavoritesTab from './components/RDFavoritesTab';
import RDInfoTab from './components/RDInfoTab';
import RDStateSitesScreen from './components/RDStateSites';
import RDSiteGaugesScreen from './components/RDSiteGauges';
import RDGaugeGraphScreen from './components/RDGaugeGraph';

//Conditionally import based on the platform
let USGSMap;

if (Platform.OS === 'ios' || Platform.OS === 'android') {
  // Import for React Native
  USGSMap = require('./components/USGSMap').default;
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RDStatesStack = () => {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="River Data" component={RDStatesScreen} options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontSize: 14,
          },
        }}/>
      <Stack.Screen
        name="State Sites"
        component={RDStateSitesScreen}
        options={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontSize: 14,
          },
        }}
      />
      <Stack.Screen
        name="Site Gauges"
        component={RDSiteGaugesScreen}
        options={({ route }) => ({
          title: route.params?.title ?? '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontSize: 14,
          },
        })}
      />
      <Stack.Screen name="Gauge Graph" component={RDGaugeGraphScreen} />
      {Platform.OS !== 'web' && <Stack.Screen name="Map" component={USGSMap} />}
    </Stack.Navigator>
  );
};

function App() {
  const [isFavorited, setIsFavorited] = useState(false);
  const [siteName, setSiteName] = useState('');

  useEffect(() => {
    setSiteName('');
  }, []);

  const iconSize = 26; // Set a fixed size for the icons


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'River Data') {
              iconName = focused ? 'water' : 'water-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
            } else if (route.name === 'About River Data') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'USMap') {
              iconName = 'map-outline';
            }

            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarActiveTintColor: '#125EA4',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen
          name="River Data"
          component={RDStatesStack}
          options={{ headerShown: false}}
        />
        <Tab.Screen
          name="Favorites"
          component={RDFavoritesTab}
          options={{ headerTitle: 'Favorites' }}
        />
        <Tab.Screen
          name="About River Data"
          component={RDInfoTab}
          options={{ headerTitle: 'About River Data' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
