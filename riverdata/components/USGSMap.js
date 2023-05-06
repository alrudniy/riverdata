import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import { Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const states = [
  { id: 'AL' }, { id: 'AK' }, { id: 'AZ' }, { id: 'AR' }, { id: 'CA' },
  { id: 'CO' }
];

const USGSMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [region, setRegion] = useState({
    latitude: 39.50,
    longitude: -98.35,
    latitudeDelta: 50,
    longitudeDelta: 50,
  });

  const navigation = useNavigation();

  const fetchData = async () => {
    setLoading(true);

    try {
      const allSites = [];

      for (const state of states) {
        try {
          const response = await fetch(`https://waterservices.usgs.gov/nwis/iv?format=json&stateCd=${state.id}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`Error! status: ${response.status}`);
          }

          const result = await response.json();
          allSites.push(...result.value.timeSeries);
        } catch (error) {
          console.error(`Error fetching data for state ${state.id}:`, error.message);
        }
      }

      setData(allSites);
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onMarkerPress = (siteCode) => {
    navigation.navigate('RDSiteGaugesScreen', { siteCode });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="chevron-back" size={32} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>USGS Map</Text>
      </View>
      <View style={styles.mapContainer}>
        <ClusteredMapView
          style={styles.map}
          region={region}
          onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
          clusteringEnabled
          clusterStyle={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: '#00BFFF',
          }}
        >
          {data.map((site) => (
            <Marker
              key={site.sourceInfo.siteCode[0].value}
              coordinate={{
                latitude: site.sourceInfo.geoLocation.geogLocation.latitude,
                longitude: site.sourceInfo.geoLocation.geogLocation.longitude,
              }}
              title={site.sourceInfo.siteName}
            >
              <Callout onPress={() => onMarkerPress(site.sourceInfo.siteCode[0].value)}>
                <Text>{site.sourceInfo.siteName}</Text>
              </Callout>
            </Marker>
          ))}
        </ClusteredMapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      height: 80,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    mapContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: '100%',
      height: '80%',
    },
  });

export default USGSMap;
