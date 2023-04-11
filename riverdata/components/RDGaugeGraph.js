import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const RDGaugeGraphScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [days, setDays] = useState(7);
  const { gaugeId, parameterCode } = route.params;

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const url = `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${gaugeId}&parm_cd=${parameterCode}&period=${days}`;
    setErr('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [days]);

  const daysText = useMemo(() => {
    return (
      <Text>
        <Text style={styles.daysTextActive}>Days: </Text>
        <Text style={styles.daysNumberActive}>{days}</Text>
      </Text>
    );
  }, [days]);

  const onSliderValueChange = (value) => {
    if (value < 7) {
      setDays(7);
    } else if (value > 119) {
      setDays(119);
    } else {
      setDays(value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Icon name="remove-circle-outline" size={25} color='#4F4E4E' onPress={() => onSliderValueChange(days - 1)} />
        <Slider
          style={styles.slider}
          minimumValue={7}
          maximumValue={119}
          step={1}
          value={days}
          onValueChange={onSliderValueChange}
          minimumTrackTintColor="#125EA4"
          maximumTrackTintColor="rgba(0, 0, 0, 0.2)"
          thumbTintColor="#125EA4"
        />
        <Icon name="add-circle-outline" size={25} color='#4F4E4E' onPress={() => onSliderValueChange(days + 1)} />
      </View>
      <View style={styles.daysContainer}>
        <Text style={styles.daysText}>7 days</Text>
        <Text style={styles.daysNumberActive}>{daysText}</Text>
        <Text style={styles.daysText}>119 days</Text>
      </View>
      {isLoading && <ActivityIndicator size="large" />}
      {err ? (
        <Text>{err}</Text>
      ) : (
        <WebView
          source={{ uri: `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${gaugeId}&parm_cd=${parameterCode}&period=${days}` }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setErr('An error occurred while loading the graph.');
            setIsLoading(false);
          }}
          javaScriptEnabled={true}
          style={styles.webView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: -2,
    marginBottom: 15,
  },
  daysText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4F4E4E',
  },
  daysNumberActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#20629F',
    marginLeft: 14,
    marginRight: 10,
    marginTop: -2,
  },
  daysTextActive: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4F4E4E',
    marginRight: 10,
  },
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RDGaugeGraphScreen;
