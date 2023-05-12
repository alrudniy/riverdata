import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-map-clustering';
import _ from 'lodash';

const states = [
  { id: 'AL' }, { id: 'AK' }, { id: 'AZ' }, { id: 'CO' }
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

  const fetchData = async () => {
    setLoading(true);

    try {
      const uniqueSites = {};

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
          result.value.timeSeries.forEach((site) => {
            const siteId = site.sourceInfo.siteCode[0].value;
            if (!uniqueSites[siteId]) {
              uniqueSites[siteId] = site;
            }
          });
        } catch (error) {
          console.error(`Error fetching data for state ${state.id}:`, error.message);
        }
      }

      setData(Object.values(uniqueSites));
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const mappedData = data.map((site) => ({
    id: site.sourceInfo.siteCode[0].value,
    coordinate: {
      latitude: site.sourceInfo.geoLocation.geogLocation.latitude,
      longitude: site.sourceInfo.geoLocation.geogLocation.longitude,
    },
    title: site.sourceInfo.siteName,
  }));

  const handleRegionChangeComplete = _.debounce((newRegion) => {
    setRegion(newRegion);
  }, 500);

  return (
    <View style={styles.container}>
      <ClusteredMapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={handleRegionChangeComplete}
        clusterColor="#00BFFF"
        animateClusters={false}
        mapType="standard"
        radius={100} 
      >
        {mappedData.map((marker, index) => renderMarker(marker, index))}
      </ClusteredMapView>
    </View>
  );
};

const renderMarker = (marker, index) => {
  return (
    <Marker
      key={`${marker.id}-${index}`}
      coordinate={marker.coordinate}
      title={marker.title}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default USGSMap;
