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
        <Icon name="remove-circle-outline" size={25} color='#125EA4' onPress={handleRemoveDays} />
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
        <Icon name="add-circle-outline" size={25} color='#125EA4' onPress={handleAddDays} />
        <Text style={styles.sliderText}>Days: {days}</Text>
      </View>
      <View style={styles.graphContainer}>
        <WebView
          source={{ uri: `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${gaugeId}&parm_cd=${parameterCode}&period=${days}` }}
          onLoad={onLoad}
          onError={onError}
          javaScriptEnabled={true}
          style={styles.webView}
        />
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#125EA4" />
          <Text style={styles.loadingText}>Loading Graph</Text>
        </View>
      )}
      {err && <Text>{err}</Text>}
    </View>
  );  
      };  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#125EA4',
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },  
  slider: {
    flex: 1,
    height: 40,
  },
  graphContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sliderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#125EA4',
  },  
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RDGaugeGraphScreen;
