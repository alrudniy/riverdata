import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RDStatesScreen from './RDStates';
import RDFavoritesTab from './RDFavoritesTab';
import RDInfoTab from './RDInfoTab';
import RDStateSitesScreen from './RDStateSites';
import RDSiteGaugesScreen from './RDSiteGauges';
import RDGaugeGraphScreen from './RDGaugeGraph';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'River Data') {
            iconName = focused
              ? 'ios-water' : 'ios-water-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Info') {
            iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#125EA4',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name="River Data" component={RDStatesScreen} />
      <Tab.Screen name="Favorites" component={RDFavoritesTab} />
      <Tab.Screen name="Info" component={RDInfoTab} />
    </Tab.Navigator>
  );
};


export default Tabs;
