// RDStates.js
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RDStatesScreen = ({ navigation }) => {
  return (
    <>
      <Text>
        <Text>
          River Data State Selection
          {"\n"}
          {"\n"}
        </Text>
        <Text>This is a placeholder screen where we want to list out all the static states supported by RiverData.

        Click the button below to navigate to the sites page for a state. Here will will hard code the state in the code. This page should use a scrollable list view.
        </Text>
      </Text>
      
      <Button
        title="Go to state sites"
        onPress={() =>
          navigation.navigate('State Sites', { name: 'NJ' })
        }
      />
    </>

  );
};


export default RDStatesScreen;