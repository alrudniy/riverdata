import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import he from 'he';

const RDSiteGaugesScreen = ({ route }) => {
  const [data, setData] = useState({ value: { timeSeries: [] } });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [gaugeLocations, setGaugeLocations] = useState({});
  const { gaugeId } = route.params;
  const navigation = useNavigation();
  let controller = null;

  const handleClick = async () => {
    setIsLoading(true);
    controller = new AbortController();
    try {
      const response = await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&site=${gaugeId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error('Error! status: ' + response.status);
      }

      const result = await response.json();
      setData(result);
      const locations = {};
      result.value.timeSeries.forEach(series => {
        const siteName = series.sourceInfo.siteName;
        const latitude = series.sourceInfo.geoLocation.latitude;
        const longitude = series.sourceInfo.geoLocation.longitude;
        locations[siteName] = { latitude, longitude };
      });
      setGaugeLocations(locations);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleClick();

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, []);

  useLayoutEffect(() => {
    const siteName = data.value && data.value.timeSeries[0] && data.value.timeSeries[0].sourceInfo && data.value.timeSeries[0].sourceInfo.siteName;
    navigation.setOptions({
      title: siteName ? siteName : '',
      // Display siteName as the header title
      headerTitle: siteName ? siteName : '',
    });
  }, [navigation, data]);

  const handleGaugePress = (item) => {
    const { variableCode } = item.variable;
    const parameterCode = variableCode ? variableCode[0].value : '';
    navigation.navigate('Gauge Graph', { gaugeId: gaugeId, parameterCode: parameterCode });
  }
  
  const renderGauge = ({ item }) => {
    const lastUpdateTime = new Date(item.values[0].value[0].dateTime);
    const formattedUpdateTime = `${lastUpdateTime.toLocaleDateString()} ${lastUpdateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const gaugeName = he.decode(item.variable.variableName);
    const gaugeUnits = he.decode(item.variable.unit.unitCode);
    return (
      <TouchableOpacity style={styles.gaugeContainer} onPress={() => handleGaugePress(item)}>
        <Text style={styles.gaugeName}>{gaugeName}</Text>
        <View style={styles.gaugeInfoContainer}>
          <Text style={styles.gaugeValue}>Value: {item.values[0].value[0].value}</Text>
          <Text style={styles.gaugeUnits}>Units: {gaugeUnits}</Text>
        </View>
        <Text style={styles.lastUpdateTime}>Last Update: {formattedUpdateTime}</Text>
      </TouchableOpacity>
    );
  };

  
  return (
    <View style={styles.container}>
      {err && <Text style={styles.error}>{err}</Text>}
      {isLoading && <Text style={styles.loading}>Loading...</Text>}
      <FlatList
        style={styles.gaugesList}
        data={data.value.timeSeries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderGauge}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  lastUpdate: {
    fontSize: 14,
    marginTop: 5,
  },
  error: {
    color: '#FF0000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  loading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  lastUpdateContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  lastUpdateText: {
    fontSize: 14,
    marginRight: 5,
    color: '#696969',
  },
  lastUpdateTime: {
    fontSize: 14,
    color: '#6B6B6C',
  },  
  gaugesList: {
    marginTop: 10,
  },
  gaugeContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  gaugeName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gaugeInfoContainer: {
    flexDirection: 'row',
  },
  gaugeValue: {
    fontSize: 14,
    marginRight: 10,
    marginBottom: 5,
  },
  gaugeUnits: {
    fontSize: 14,
  },
});


export default RDSiteGaugesScreen;
