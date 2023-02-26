import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, View, Text, FlatList, StatusBar, StyleSheet } from 'react-native';
import { NavigationActions } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Item from './Item';

const RDStateSitesScreen = ({ route, navigation }) => {
  const [data, setData] = useState({ value: { timeSeries: [] } });
  const [err, setErr] = useState('');
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { stateId } = route.params;

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://waterservices.usgs.gov/nwis/iv?format=json&stateCd=${stateId}`, {
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
    }
    setLoading(false);
  }

  const processData = () => {
    let arr = [];
    data.value.timeSeries.map(site => {
      if (arr.some((val) => { return val["siteName"] == site.sourceInfo.siteName })) {
        arr.forEach((k) => {
          if (k["siteName"] === site.sourceInfo.siteName) {
            k["gauges"]++
          }
        })
      } else {
        let a = {};
        a["siteName"] = site.sourceInfo.siteName
        a["siteValue"] = site.sourceInfo.siteCode[0].value
        a["gauges"] = 1
        arr.push(a);
      }
    });
    // Sort sites in alphabetical order by siteName
    arr.sort((a, b) => a.siteName.localeCompare(b.siteName));
    setSites(arr);
  }

  useEffect(() => {
    handleClick();
  }, []);

  useEffect(() => {
    processData();
  }, [data]);

  return (
    <View style={styles.container}>
      {err && <Text style={styles.error}>{err}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loading} />
      ) : (
        <FlatList
          data={sites}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Item
                key={`${item.siteName}_${item.siteValue}`}
                label={item.siteName}
                description={<Text style={styles.gauges}>{`${item.gauges} gauges`}</Text>}
                onPress={() => {
                  navigation.navigate('Site Gauges', { gaugeId: item.siteValue })
                }}
              />
            </View>
          )}
          keyExtractor={(item) => `${item.siteName}_${item.siteValue}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: '#f00',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gauges: {
    fontStyle: 'italic',
  },
});



export default RDStateSitesScreen;
