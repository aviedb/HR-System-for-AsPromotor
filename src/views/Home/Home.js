import React, { Component } from 'react';
import { StyleSheet, StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  Text,
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab,
  Button
} from 'react-native-ui-kitten';
import { AntDesign } from '@expo/vector-icons';

import Schedule from '../Schedule';

class Home extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    selectedIndex: 0,
    title: 'Home'
  };

  onTabSelect = (selectedIndex) => {
    let title = [
      'Home',
      'Schedule',
      'File',
      'Notification',
      'Profile'
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
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        {this.state.selectedIndex !== 1 &&
          <TopNavigation
            title={this.state.title}
            alignment="center"
            style={styles.header}
            titleStyle={styles.headerTitle} />
        }
        <View style={styles.container}>
          { this.state.selectedIndex === 1?
            <Schedule navigation={this.props.navigation}/>:
            <View>
              <Text>Lorem ipsum dolor sit amet {this.state.selectedIndex}</Text>
              <Button onPress={() => this.props.navigation.navigate('Settings')}>go so settings</Button>
            </View>
          }
        </View>
        <BottomNavigation
          style={styles.bottomNav}
          selectedIndex={this.state.selectedIndex}
          indicatorStyle={{height: 0}}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab icon={this.icon('home', 0)} />
          <BottomNavigationTab icon={this.icon('calendar', 1)} />
          <BottomNavigationTab icon={this.icon('pdffile1', 2)} />
          <BottomNavigationTab icon={this.icon('bells', 3)} />
          <BottomNavigationTab icon={this.icon('user', 4)} />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
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
  }
});

export default Home;