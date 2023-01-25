// RDStateSites.js
import React, { Component, useEffect, useState } from 'react';
import { Button, View, Text, ScrollView, StatusBar } from 'react-native';
import { NavigationActions } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Item from './Item';

const RDStateSitesScreen = ({ route, navigation }) => {
  const [data, setData] = useState({value: {timeSeries: []}});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [sites, setSites] = useState([]);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://waterservices.usgs.gov/nwis/iv?format=json&stateCd=nj', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error! status: ' + response.status);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));
      console.log("check1")
      setData(result);
      console.log("check2")
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
      console.log("check3")
    }
  }

  const processData = () => {
    let arr = [];
      data.value.timeSeries.map(site=>{
      if(arr.some((val)=>{ return val["siteName"] == site.sourceInfo.siteName })){
        arr.forEach((k)=>{
          if(k["siteName"] === site.sourceInfo.siteName){ 
            k["gauges"]++
          }
        }) 
        }else{
        let a = {};
        a["siteName"] = site.sourceInfo.siteName
        a["siteValue"] = site.sourceInfo.siteCode[0].value
        a["gauges"] = 1
        arr.push(a); 
      }
      setSites(arr);
    });
  }
  console.log("check4")
  useEffect(()=> {
    handleClick();
  }, [])

  useEffect(() => {
    processData();
    console.log("sites are: ", sites);
  },[data])

  console.log("check5")
  console.log(data);
  console.log("check6")
  return (
    <View style={{ flex: 1 }}>
      {err && <Text>{err}</Text>}

      {isLoading && <Text>Loading...</Text>}
      <ScrollView style={{ flex: 1 }}>
        {sites.map(site => {
          return(
            <Item key={site.siteName} label={site.siteName} description={site.gauges + " gauges"} onPress={ () => {
              navigation.navigate('Site Gauges', { gaugeId: site.siteValue })
            }} />
          )
        })}
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </View>
  )

}
export default RDStateSitesScreen;