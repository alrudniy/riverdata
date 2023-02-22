import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';

const RDGaugeGraphScreen = ({ route }) => {
  const [loading, setLoading] = useState(true);

  const siteCode = route.params.siteCode;
  const parameterCode = route.params.parameterCode;

  const url = `http://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=${siteCode}&parm_cd=${parameterCode}&period=`;

  useEffect(() => {
    setLoading(true);
  }, [url]);

  const handleWebViewLoad = () => {
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#125EA4" style={styles.loading} />
      )}
      <WebView
        source={{ uri: url }}
        onLoad={handleWebViewLoad}
        style={styles.webView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webView: {
    flex: 1,
    width: '100%',
  },
  loading: {
    position: 'absolute',
  },
});

export default RDGaugeGraphScreen;
