// RDSiteGauges.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const RDSiteGaugesScreen = ({ route, navigation }) => {
  return (
  <>  
    <Text>This screen will have a list view and show all the gauges and values for a site
    </Text>
    <Button
          title="An action here on a guage value would take you to the graph"
          onPress={() =>
            navigation.navigate('Gauge Graph', { siteItemId: '123' })
          }
        />
    </>
  );
};

export default RDSiteGaugesScreen;