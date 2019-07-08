import React, { Component } from 'react';
import { StyleSheet, StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  Text,
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import Schedule from '../Schedule';

class Home extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    selectedIndex: 0,
    title: 'MSISDN',
    location: '',
    errorMessage: ''
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  onTabSelect = (selectedIndex) => {
    let title = [
      'MSISDN',
      'Knowledge Base',
      'ASpro Report',
      'Payroll Slip',
      'Schedule'
    ];

    this.setState({ selectedIndex, title: title[selectedIndex] });
  };

  icon = (name, index, IconComponent) => () => {
    if (!IconComponent) IconComponent = AntDesign;
    
    let color = '#333A4F';
    if (index !== null) color = this.state.selectedIndex === index? '#3267FF':'#8F9BB3';

    return <IconComponent
      name={name}
      size={24}
      color={color}
    />
  }

  render() {

    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        {this.state.selectedIndex !== 4 &&
          <TopNavigation
            title={this.state.title}
            alignment="center"
            style={styles.header}
            titleStyle={styles.headerTitle} />
        }
        <View style={styles.container}>
          {this.state.selectedIndex === 4?
            <Schedule navigation={this.props.navigation}/>:
            <View style={styles.view}>
              <Text>Lorem ipsum dolor sit amet {this.state.selectedIndex}</Text>
              <Text>{text}</Text>
            </View>
          }
        </View>
        <BottomNavigation
          style={styles.bottomNav}
          selectedIndex={this.state.selectedIndex}
          indicatorStyle={{height: 0}}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab icon={this.icon('database', 0)} />
          <BottomNavigationTab icon={this.icon('inbox', 1)} />
          <BottomNavigationTab icon={this.icon('pluscircle', 2)} />
          <BottomNavigationTab icon={this.icon('mail', 3)} />
          <BottomNavigationTab icon={this.icon('calendar', 4)} />
        </BottomNavigation>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: 'white'
  },
  header: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 3,
    zIndex: 1
  },
  headerTitle: {
    fontFamily: 'helvetica_neue_md',
    fontWeight: "normal",
    fontSize: 16
  },
  bottomNav: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC'
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;