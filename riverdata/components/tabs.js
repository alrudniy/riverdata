import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import RDStatesScreen from './RDStates';
import RDFavoritesTab from './RDFavoritesTab';
import RDInfoTab from './RDInfoTab';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
      <Tab.Navigator >
        <Tab.Screen name="River Data" component={RDStatesScreen} />
        <Tab.Screen name="Favorites" component={RDFavoritesTab} />
        <Tab.Screen name="Info" component={RDInfoTab} />
      </Tab.Navigator>
    );
  }

  export default Tabs;