import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from './Item';

const RDFavoritesTab = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });

    return unsubscribe;
  }, [navigation]);

  const handleFavorite = async (site) => {
    let updatedFavorites = [];
    try {
      const index = favorites.findIndex((favorite) => favorite.siteValue === site.siteValue);
  
      if (index >= 0) {
        // Remove site from favorites if it's already there
        updatedFavorites = [...favorites.slice(0, index), ...favorites.slice(index + 1)];
        setFavorites(updatedFavorites);
      }
  
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error handling favorite site:', error);
    }
  };

  const renderSwipeableItem = ({ item }) => {
    const rightSwipe = (progress, dragX) => {
      const scale = dragX.interpolate({
        inputRange: [-80, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp',
      });
  
      return (
        <TouchableOpacity
          onPress={() => handleFavorite(item)}
          style={styles.swipeButtonFavorited}
        >
          <Animated.View style={{ transform: [{ scale }] }}>
            <Ionicons name="heart" size={26} color="white" />
          </Animated.View>
        </TouchableOpacity>
      );
    };
  
    return (
      <Swipeable renderRightActions={rightSwipe}>
        <View style={styles.item}>
          <Item
            key={`${item.siteName}_${item.siteValue}`}
            label={item.siteName}
            description={<Text style={styles.gauges}>{`${item.gauges} gauges`}</Text>}
            onPress={() => {
              navigation.navigate('Site Gauges', { gaugeId: item.siteValue });
            }}
          />
        </View>
      </Swipeable>
    );
  };  

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Item
        key={`${item.siteName}_${item.siteValue}`}
        label={item.siteName}
        description={<Text style={styles.gauges}>{`${item.gauges} gauges`}</Text>}
        onPress={() => {
          navigation.navigate('Site Gauges', { gaugeId: item.siteValue });
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderSwipeableItem}
        keyExtractor={(item) => `${item.siteName}_${item.siteValue}`}
      />
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
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 10,
  },
  gauges: {
    fontStyle: 'italic',
  },
  swipeButtonFavorited: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#C41E3A',
  },  
});

export default RDFavoritesTab;
