import React, { useState, useEffect } from 'react';
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

  const onLoad = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setErr('An error occurred while loading the graph.');
    setIsLoading(false);
  };

  const handleAddDays = () => {
    if (days < 119) {
      setDays(days + 1);
    }
  };

  const handleRemoveDays = () => {
    if (days > 7) {
      setDays(days - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Icon name="remove-circle-outline" size={25} color='#4F4E4E' onPress={handleRemoveDays} />
        <Slider
          style={styles.slider} 
          minimumValue={7}
          maximumValue={119}
          step={1}
          value={days}
          onValueChange={(value) => setDays(value)}
          minimumTrackTintColor="#125EA4"
          maximumTrackTintColor="rgba(0, 0, 0, 0.2)"
          thumbTintColor="#125EA4"
          />
        <Icon name="add-circle-outline" size={25} color='#4F4E4E' onPress={handleAddDays} />
        <Text style={styles.sliderText}>Days: {days}</Text>
      </View>
      {isLoading && <ActivityIndicator size="large" />}
      {err ? (
        <Text>{err}</Text>
      ) : (
        <WebView
          source={{ uri: `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${gaugeId}&parm_cd=${parameterCode}&period=${days}` }}
          onLoad={onLoad}
          onError={onError}
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
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4F4E4E',
  },
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RDGaugeGraphScreen;
