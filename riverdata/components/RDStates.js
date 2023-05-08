// RDStates.js
import React, { useLayoutEffect } from 'react';
import { Button, View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import {useState} from "react";
import icons from './icons';

const states = [
  { id: 'al', name: 'Alabama', icon: icons.al },
  { id: 'ak', name: 'Alaska', icon: icons.ak },
  { id: 'az', name: 'Arizona', icon: icons.az },
  { id: 'ar', name: 'Arkansas', icon: icons.ar },
  { id: 'ca', name: 'California', icon: icons.ca },
  { id: 'co', name: 'Colorado', icon: icons.co },
  { id: 'ct', name: 'Connecticut', icon: icons.ct },
  { id: 'de', name: 'Delaware', icon: icons.de },
  { id: 'fl', name: 'Florida', icon: icons.fl },
  { id: 'ga', name: 'Georgia', icon: icons.ga },
  { id: 'hi', name: 'Hawaii', icon: icons.hi },
  { id: 'id', name: 'Idaho', icon: icons.id },
  { id: 'il', name: 'Illinois', icon: icons.il },
  { id: 'in', name: 'Indiana', icon: icons.ind },
  { id: 'ia', name: 'Iowa', icon: icons.ia },
  { id: 'ks', name: 'Kansas', icon: icons.ks },
  { id: 'ky', name: 'Kentucky', icon: icons.ky },
  { id: 'la', name: 'Louisiana', icon: icons.la },
  { id: 'me', name: 'Maine', icon: icons.me },
  { id: 'md', name: 'Maryland', icon: icons.md },
  { id: 'ma', name: 'Massachusetts', icon: icons.ma },
  { id: 'mi', name: 'Michigan', icon: icons.mi },
  { id: 'mn', name: 'Minnesota', icon: icons.mn },
  { id: 'ms', name: 'Mississippi', icon: icons.ms },
  { id: 'mo', name: 'Missouri', icon: icons.mo },
  { id: 'mt', name: 'Montana', icon: icons.mt },
  { id: 'ne', name: 'Nebraska', icon: icons.ne },
  { id: 'nv', name: 'Nevada', icon: icons.nv },
  { id: 'nh', name: 'New Hampshire', icon: icons.nh },
  { id: 'nj', name: 'New Jersey', icon: icons.nj },
  { id: 'nm', name: 'New Mexico', icon: icons.nm },
  { id: 'ny', name: 'New York', icon: icons.ny },
  { id: 'nc', name: 'North Carolina', icon: icons.nc },
  { id: 'nd', name: 'North Dakota', icon: icons.nd },
  { id: 'oh', name: 'Ohio', icon: icons.oh },
  { id: 'ok', name: 'Oklahoma', icon: icons.ok },
  { id: 'or', name: 'Oregon', icon: icons.or },
  { id: 'pa', name: 'Pennsylvania', icon: icons.pa },
  { id: 'ri', name: 'Rhode Island', icon: icons.ri },
  { id: 'sc', name: 'South Carolina', icon: icons.sc },
  { id: 'sd', name: 'South Dakota', icon: icons.sd },
  { id: 'tn', name: 'Tennessee', icon: icons.tn },
  { id: 'tx', name: 'Texas', icon: icons.tx },
  { id: 'ut', name: 'Utah', icon: icons.ut },
  { id: 'vt', name: 'Vermont', icon: icons.vt },
  { id: 'va', name: 'Virginia', icon: icons.va },
  { id: 'wa', name: 'Washington', icon: icons.wa },
  { id: 'wv', name: 'West Virginia', icon: icons.wv },
  { id: 'wi', name: 'Wisconsin', icon: icons.wi },
  { id: 'wy', name: 'Wyoming', icon: icons.wy },
];

const StateList = ({ navigation }) => {
  const [selectedState, setSelectedState] = useState('');
  const [searchText, setSearchText] = useState('');

  const handlePress = (id, name) => {
    setSelectedState(id);
    navigation.navigate('State Sites', { stateId: id, stateName: name });
  };

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <View style={styles.itemContainer}>
        {item.icon && <Image source={item.icon} style={{ width: 32, height: 32, marginRight: 10 }} resizeMode="contain" />}
        <Text style={styles.itemText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleMapPress = () => {
    navigation.navigate('USGS Map Screen');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleMapPress} style={styles.mapIcon}>
          <Ionicons name="map-outline" size={28} color="#333" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a state..."
          placeholderTextColor="#8e8e8e"
          onChangeText={setSearchText}
          value={searchText}
        />
      </View>
      <FlatList
        data={filteredStates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedState}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  mapIcon: {
    marginRight: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    color: '#333',
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
  }
});

export default StateList;