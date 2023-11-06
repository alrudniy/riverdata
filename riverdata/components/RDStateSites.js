import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Animated, ActivityIndicator, TouchableOpacity, View, Text, FlatList, StyleSheet, TextInput } from 'react-native';
import { NavigationActions } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from './Item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



const RDStateSitesScreen = ({ route, navigation }) => {
  const [data, setData] = useState({ value: { timeSeries: [] } });
  const [err, setErr] = useState('');
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [siteName, setSiteName] = useState('');
  const [stateName, setStateName] = useState('');
  const [filterNumbers, setFilterNumbers] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(''); 
  

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
      setStateName(result.value.timeSeries[0].sourceInfo.state);
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
    if (data.value && data.value.timeSeries && data.value.timeSeries.length > 0) {
      processData();
    }
  }, [data]);

  const filteredSites = sites.filter((site) => {
    return site.siteName.toLowerCase().includes(search.toLowerCase());
  }).filter((site) => {
    return !filterNumbers || /^[^a-zA-Z]/.test(site.siteName) === false;
  });
  
  const handlePress = (name) => {
    setSiteName(name);
  }

  const handleFilterNumbers = () => {
    setFilterNumbers(!filterNumbers);
  } // new function to toggle filterNumbers state variable

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleFilterNumbers} style={styles.filterButton}>
          <Ionicons name={filterNumbers ? "filter" : "filter-outline"} size={24} />
        </TouchableOpacity>
      ),
    });
  }, [filterNumbers, navigation]);

  const fetchFavoritedStatus = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      const newFavoritedStatus = {};
  
      favorites.forEach((favorite) => {
        const siteKey = `${favorite.siteName}_${favorite.siteValue}`;
        newFavoritedStatus[siteKey] = true;
      });
  
      setFavoritedStatus(newFavoritedStatus);
    } catch (error) {
      console.error('Error fetching favorited status:', error);
    }
  };

  useEffect(() => {
    handleClick();
    fetchFavoritedStatus();
  }, []);  
  
  const handleFavorite = async (site) => {
    let favorited = false;
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      const index = favorites.findIndex((favorite) => favorite.siteValue === site.siteValue);
  
      if (index >= 0) {
        // Remove site from favorites if it's already there
        favorites.splice(index, 1);
      } else {
        // Add site to favorites if it's not there
        favorites.push(site);
        favorited = true;
      }
  
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error handling favorite site:', error);
    }
    return favorited;
  };
  
  const [favoritedStatus, setFavoritedStatus] = useState({});

  const renderSwipeableItem = ({ item }) => {
    const siteKey = `${item.siteName}_${item.siteValue}`;
    const isFavorited = favoritedStatus[siteKey] || false;
  
    const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
    
      return (
        <TouchableOpacity
          onPress={async () => {
            const updatedFavoritedStatus = await handleFavorite(item);
            setFavoritedStatus({ ...favoritedStatus, [siteKey]: updatedFavoritedStatus });
          }}
          style={[
            styles.swipeButton,
            isFavorited ? styles.swipeButtonFavorited : styles.swipeButtonNotFavorited,
          ]}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={28}
              color="white"
            />
          </Animated.View>
        </TouchableOpacity>
      );
    };
    
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.item}>
          <Item
            key={siteKey}
            label={item.siteName}
            description={<Text style={styles.gauges}>{`${item.gauges} gauges`}</Text>}
            onPress={() => {
              navigation.navigate('Site Gauges', { gaugeId: item.siteValue });
            }}
          />
        </View>
      </Swipeable>
     </GestureHandlerRootView>

    );
  };
  

  return (
    <View style={styles.container}>
      {err && <Text style={styles.error}>{err}</Text>}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a site..."
        placeholderTextColor="#8e8e8e"
        onChangeText={setSearch}
        value={search}
      />
      {loading ? (
             <View style={styles.loadingContainer}>
             <Text style={styles.loadingText}>{loadingMessage}</Text>
             <ActivityIndicator size="large" color="#125EA4" style={styles.loading} />
             <Text style={styles.loadingText}>Loading Sites</Text>
           </View>
      ) : (
        <FlatList
          data={filteredSites}
          renderItem={renderSwipeableItem}
          keyExtractor={(item) => `${item.siteName}_${item.siteValue}`}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 1,
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'gray',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 16,
    color: '#333',
    marginHorizontal: 2,
    marginTop: -10,
  },
  siteName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gauges: {
    fontStyle: 'italic',
  },
    loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#125EA4',
  },
  swipeButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  swipeButtonNotFavorited: {
    backgroundColor: '#125EA4',
  },
  swipeButtonFavorited: {
    backgroundColor: '#C41E3A',
  },  
});



export default RDStateSitesScreen;
