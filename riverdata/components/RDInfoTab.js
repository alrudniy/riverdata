import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';


const RDInfoTab = () => {
  const [drawer1Open, setDrawer1Open] = useState(false);
  const [drawer2Open, setDrawer2Open] = useState(false);
  const [drawer3Open, setDrawer3Open] = useState(false);
  const [drawer4Open, setDrawer4Open] = useState(false);


  const toggleDrawer1 = () => setDrawer1Open(!drawer1Open);
  const toggleDrawer2 = () => setDrawer2Open(!drawer2Open);
  const toggleDrawer3 = () => setDrawer3Open(!drawer3Open);
  const toggleDrawer4 = () => setDrawer4Open(!drawer4Open);


return (
  <ScrollView style={{ backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 10 }}>
    <TouchableOpacity
      style={{ backgroundColor: '#F5F5F5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}
      onPress={toggleDrawer1}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name={drawer1Open ? 'up' : 'down'} size={20} />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Disclaimer</Text>
      </View>
      {drawer1Open && (
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 16 }}>
            The River Data application is meant for informational purposes and cannot guarantee the accuracy or availability of any data.
          </Text>
          <Text style={{ fontSize: 16 }}>
          {'\n'}
          The author of this application cannot make any claims as the accuracy of the data or uptime of any of the gauge data or external sources from where the application data comes from.
          </Text>
        </View>
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={{ backgroundColor: '#F5F5F5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}
      onPress={toggleDrawer2}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name={drawer2Open ? 'up' : 'down'} size={20} />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>About River Data Version 3</Text>
      </View>
      {drawer2Open && (
        <View style={{ marginTop: 15 }}>
       <Text style={[styles.listItem]}>
        The River Data application for mobile devices uses the existing USGS services to retrieve near real-time river gauge data for over 14,000 USGS monitoring sites in the United States, including Puerto Rico and District of Columbia.
      </Text>
      <Text style={styles.listItem}>
        The application allows you to view all gauge data available and view chart history for any gauge from 1 to 119 days.
      </Text>
      <Text style={styles.listItem}>
        River Data is built for iOS 8 and 9.
      </Text>
      <Text style={styles.listItem}>
        River Data is written by Tim Kelly for iPhone and iPad.
      </Text>
      <Text style={styles.listItem}>
        This application is in no way affiliated with Apple, USGS, or any governmental agency.
      </Text>
        </View>
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={{ backgroundColor: '#F5F5F5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}
      onPress={toggleDrawer4}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name={drawer1Open ? 'up' : 'down'} size={20} />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Helpful Links</Text>
      </View>
      {drawer4Open && (
        <View style={{ marginTop: 15 }}>
        <Text style={[styles.text, { marginBottom: 10 }]}>
        <Text style={styles.text}>See this </Text>
          <TouchableWithoutFeedback onPress={() => Linking.openURL('https://waterservices.usgs.gov/docs/portable_code.html')}>
            <Text style={styles.link}>USGS Data Sercies Description</Text>
          </TouchableWithoutFeedback> for information on how the web services work.
        </Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://waterdata.usgs.gov/nwis/rt')}>
        <Text style={styles.link}>USGS Water Information System Web Interface</Text>
        </TouchableWithoutFeedback>. This is the hard way to find your river data.
        </Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>
        <TouchableWithoutFeedback onPress={() => Linking.openURL('https://en.wikipedia.org/wiki/Stream_gauge')}>
        <Text style={styles.link}>Wikipedia description of a water gauge</Text>
        </TouchableWithoutFeedback>. Good overview on stream gauges and measurements in general.
        </Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>
        A list of other applications available that use the <TouchableWithoutFeedback onPress={() => Linking.openURL('https://waterservices.usgs.gov/examples/showcase.html')}>
        <Text style={styles.link}>USGS water services is here</Text>
        </TouchableWithoutFeedback>.
        </Text>
        </View>
      )}
    </TouchableOpacity>
    <TouchableOpacity
      style={{ backgroundColor: '#F5F5F5', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, marginBottom: 10 }}
      onPress={toggleDrawer3}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign name={drawer3Open ? 'up' : 'down'} size={20} />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>FAQ & Tips</Text>
      </View>
      {drawer3Open && (
        <View style={{ marginTop: 15 }}>
        <Text style={styles.header}>Zooming in on the map is sometimes slow?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Depending on your device hardware, it may take a second or two for the maps to refresh in highly concentrated areas of sites. If you see this looking at the entire US view, try switching to just a single state.</Text>

        <Text style={styles.header}>Offline Use?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>You can use river data for offline use for the map views. This app has all the sites built into the app for quick offline access for you to search and favorite. You must have a network connection to access any gauge data from USGS.</Text>

        <Text style={styles.header}>How do you refresh data?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>All screens that display USGS water data support pull-to-refresh. Simply swipe the screen downward and new data will be requested from USGS servers.</Text>

        <Text style={styles.header}>How do I favorite a site?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>There is a star in the upper right corner of a site summary. Simply tap the star and once it is illuminated yellow it will appear under the Favorites tab.</Text>

        <Text style={styles.header}>How can I rename a favorite site?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Under the Favorites tab, tap the Edit button and then tap the river name display name you want to edit.</Text>

        <Text style={styles.header}>How can I get you to add more rivers?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>All rivers come from USGS. I have no control over the rivers listed in this app, so if you don't see the river it's because it is not monitored, you are looking under the wrong state, or the river may be monitored by a separated state agency.</Text>

        <Text style={styles.header}>Why doesn't my favorite river have as many gauges as other river sites?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Each river site has a different number of gauges. The number of gauges and what they do it dependent on funding from USGS and what they choose to monitor.</Text>

        <Text style={styles.header}>How do I share a river site?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>There is a share icon at the top right of the screen with the gauge chart. Simply tap the share icon and you can share a single-gauge's current data reading as well as the chart image currently displayed. Sharing supports all the common methods of sharing such as, email, text message, Facebook, Twitter and more.</Text>

        <Text style={styles.header}>How do I zoom a chart?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Charts for river gauges support pinch-to-zoom, double tap to zoom, or two-finger tap to zoom out.</Text>

        <Text style={styles.header}>Why does the gauge value have -999999?</Text>
        <Text style={[styles.text, { marginBottom: 10 }]}>Some gauges may be out or no longer in service. In this case the value will typically be -99999 and in most cases there will be no chart available for that site.</Text>
        </View>
      )}
    </TouchableOpacity>
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  answer: {
    fontSize: 16,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#125EA4',
    textDecorationLine: 'underline'
  }
});

export default RDInfoTab;
