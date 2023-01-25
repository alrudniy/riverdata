// RDGaugeGraph.js
import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const RDGaugeGraphScreen = ({ route, navigation }) => {
  return (
  <>  
    <Text>This screen is where we will show the rendered graph. This is the last screen in the navigation stack
    </Text>
  </>
  );
};

export default RDGaugeGraphScreen;