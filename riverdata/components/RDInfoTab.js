// RDInfoTab.js
import React, { Component , useState} from 'react';
import { Button, View, Text, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accordion from 'react-native-collapsible/Accordion';  // npm install --save react-native-collapsible

const RDInfoTab = ({ route, navigation }) => {

  const [isFavoriteEnabled, setFavoriteEnabled] = useState(true);
  const [isNumberEnabled, setNumberEnabled] = useState(true);

  const [favText, setFavText] = useState('');
  const [numText, setNumText] = useState('');
  
  const favoriteToggleSwitch = () => { 
    if(isFavoriteEnabled) {
      setFavText('App will not start on Favorites');
    }
    else {
      setFavText('App will start on Favorites');
    }
    setFavoriteEnabled(previousState => !previousState)
  }

  const numberToggleSwitch = () => { 
    if(isNumberEnabled) {
      setNumText('Sites not Filtered');
    }
    else {
      setNumText('Sites Filtered');
    }
    setNumberEnabled(previousState => !previousState)
  }

  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];
  
  class AccordionView extends Component {
    state = {
      activeSections: [],
    };
  
    _renderSectionTitle = (section) => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
  
    _renderHeader = (section) => {
      return (
        <View style={styles.header}>
          <Text style={styles.headerText}>{section.title}</Text>
        </View>
      );
    };
  
    _renderContent = (section) => {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    };
  
    _updateSections = (activeSections) => {
      this.setState({ activeSections }
        );
    };
  }

  return (
    <>  
      <Text>
        SETTINGS
      </Text>
      <Text>
        Filter sites beginning with numbers
      </Text>
      <Switch onValueChange={favoriteToggleSwitch} value={isFavoriteEnabled}/>
      <Text>
        {favText}
      </Text>
      <Switch onValueChange={numberToggleSwitch} value={isNumberEnabled}/>
      <Text>
        {numText}
      </Text>
      <Text>
        HELP 
      </Text>
      <Text>
        View Help and App info...
      </Text>
      <Text>
      Contact Support...
      </Text>
      <Text>
      Version 1.0.0
      </Text>

      <Accordion
      activeSections={[0]}
      sections={['Section 1', 'Section 2', 'Section 3']}
   
      />
    </>
    );
  }

  export default RDInfoTab;