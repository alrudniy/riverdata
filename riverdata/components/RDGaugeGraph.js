import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const RDGaugeGraphScreen = ({ route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const { gaugeId, parameterCode } = route.params;

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const onLoad = () => {
    setIsLoading(false);
  };

  const onError = () => {
    setErr('An error occurred while loading the graph.');
    setIsLoading(false);
  };

  const url = `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${gaugeId}&parm_cd=00065&period=7`;

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator size="large" />}
      {err ? (
        <Text>{err}</Text>
      ) : (
        <WebView
          source={{ uri: url }}
          onLoad={onLoad}
          onError={onError}
          javaScriptEnabled={true}
          style={{ flex: 1 }}
        />
      )}
    </View>
  );
};

export default RDGaugeGraphScreen;
