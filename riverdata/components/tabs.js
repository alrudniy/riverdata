import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RDStatesScreen from './RDStates';
import RDFavoritesTab from './RDFavoritesTab';
import RDInfoTab from './RDInfoTab';
import RDStateSitesScreen from './RDStateSites';
import RDSiteGaugesScreen from './RDSiteGauges';
import RDGaugeGraphScreen from './RDGaugeGraph';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const iconSize = 26; // Set a fixed size for the icons

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'River Data') {
            iconName = focused
              ? 'water' : 'water-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'About River Data') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          } else if (route.name === 'USMap') {
            iconName = 'map-outline';
          }

          return (
            <Ionicons name={iconName} size={iconSize} color={color} />
          );
        },
        tabBarActiveTintColor: '#125EA4',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="River Data" component={RDStatesScreen} />
      <Tab.Screen name="Favorites" component={RDFavoritesTab} />
      <Tab.Screen name="About River Data" component={RDInfoTab} />
    </Tab.Navigator>
  );
};


export default Tabs;
