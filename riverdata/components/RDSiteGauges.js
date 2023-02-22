import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RDSiteGaugesScreen = ({ route }) => {
  const [data, setData] = useState({value: {timeSeries: []}});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const { gaugeId } = route.params;
  const navigation = useNavigation();

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://waterservices.usgs.gov/nwis/iv/?format=json&site=${gaugeId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error! status: ' + response.status);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(()=> {
    handleClick();
  }, [])

  const handleGaugePress = (item) => {
    navigation.navigate('Gauge Graph', {gaugeId: gaugeId, parameterCode: item.variable.variableCode});
  }

  const renderGauge = ({item}) => (
    <TouchableOpacity style={styles.gaugeContainer} onPress={() => handleGaugePress(item)}>
      <Text style={styles.gaugeName}>{item.variable.variableName}</Text>
      <View style={styles.gaugeInfoContainer}>
        <Text style={styles.gaugeValue}>Value: {item.values[0].value[0].value}</Text>
        <Text style={styles.gaugeUnits}>Units: {item.variable.unit.unitCode}</Text>
      </View>
    </TouchableOpacity>
  );

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
  },
  gaugeUnits: {
    fontSize: 14,
  },
});

export default RDSiteGaugesScreen;
