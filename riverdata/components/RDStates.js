// RDStates.js
import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useState} from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

const states = [
   { id: 'al', name: 'Alabama' },
  { id: 'ak', name: 'Alaska' },
  { id: 'az', name: 'Arizona' },
  { id: 'ar', name: 'Arkansas' },
  { id: 'ca', name: 'California' },
  { id: 'co', name: 'Colorado' },
  { id: 'ct', name: 'Connecticut' },
  { id: 'de', name: 'Delaware' },
  { id: 'fl', name: 'Florida' },
  { id: 'ga', name: 'Georgia' },
  { id: 'hi', name: 'Hawaii' },
  { id: 'id', name: 'Idaho' },
  { id: 'il', name: 'Illinois' },
  { id: 'in', name: 'Indiana' },
  { id: 'ia', name: 'Iowa' },
  { id: 'ks', name: 'Kansas' },
  { id: 'ky', name: 'Kentucky' },
  { id: 'la', name: 'Louisiana' },
  { id: 'me', name: 'Maine' },
  { id: 'md', name: 'Maryland' },
  { id: 'ma', name: 'Massachusetts' },
  { id: 'mi', name: 'Michigan' },
  { id: 'mn', name: 'Minnesota' },
  { id: 'ms', name: 'Mississippi' },
  { id: 'mo', name: 'Missouri' },
  { id: 'mt', name: 'Montana' },
  { id: 'ne', name: 'Nebraska' },
  { id: 'nv', name: 'Nevada' },
  { id: 'nh', name: 'New Hampshire' },
  { id: 'nj', name: 'New Jersey' },
  { id: 'nm', name: 'New Mexico' },
  { id: 'ny', name: 'New York' },
  { id: 'nc', name: 'North Carolina' },
  { id: 'nd', name: 'North Dakota' },
  { id: 'oh', name: 'Ohio' },
  { id: 'ok', name: 'Oklahoma' },
  { id: 'or', name: 'Oregon' },
  { id: 'pa', name: 'Pennsylvania' },
  { id: 'ri', name: 'Rhode Island' },
  { id: 'sc', name: 'South Carolina' },
  { id: 'sd', name: 'South Dakota' },
  { id: 'tn', name: 'Tennessee' },
  { id: 'tx', name: 'Texas' },
  { id: 'ut', name: 'Utah' },
  { id: 'vt', name: 'Vermont' },
  { id: 'va', name: 'Virginia' },
  { id: 'wa', name: 'Washington' },
  { id: 'wv', name: 'West Virginia' },
  { id: 'wi', name: 'Wisconsin' },
  { id: 'wy', name: 'Wyoming' },
];

const StateList = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState('');

  const handlePress = (id) => {
    setSelectedState(id);
    navigation.navigate('State Sites', { stateId: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={styles.itemContainer}>
        <Icon name="map-marker" size={20} color="black" style={styles.icon} />
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={states}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  icon: {
    marginRight: 10,
  },
  itemText: {
    fontSize: 20,
    color: '#333333',
  },
});

export default StateList;