import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RDStatesScreen from './RDStates';
import RDFavoritesTab from './RDFavoritesTab';
import RDInfoTab from './RDInfoTab';

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

          // You can return any component that you like here
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#125EA4',
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <Tab.Screen name="River Data" component={RDStatesScreen} />
      <Tab.Screen name="Favorites" component={RDFavoritesTab} />
      <Tab.Screen name="Info" component={RDInfoTab} />
    </Tab.Navigator>
  );
};

export default Tabs;
