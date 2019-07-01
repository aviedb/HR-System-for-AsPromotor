import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  Text,
  TopNavigation,
  BottomNavigation,
  BottomNavigationTab
} from 'react-native-ui-kitten';
import { AntDesign } from '@expo/vector-icons';

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
      'Search',
      'File',
      'Notification',
      'Profile'
    ];

    this.setState({ selectedIndex, title: title[selectedIndex] });
  };

  icon = (name, index) => () => {
    return <AntDesign
      name={name}
      size={24}
      color={this.state.selectedIndex === index?'#3267FF':'#8F9BB3'}
    />
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar 
          translucent 
          backgroundColor={Platform.OS==='android'? '#eee':'#fff'} 
          barStyle="dark-content" />
        <TopNavigation
          title={this.state.title}
          alignment={Platform.OS === 'android'? 'start':'center'}
          style={styles.header} />
        <View style={styles.container}>
          <Text>Lorem ipsum dolor sit amet {this.state.selectedIndex}</Text>
        </View>
        <BottomNavigation
          style={styles.bottomNav}
          selectedIndex={this.state.selectedIndex}
          indicatorStyle={{display: 'none'}}
          onSelect={this.onTabSelect}>
          <BottomNavigationTab icon={this.icon('home', 0)} />
          <BottomNavigationTab icon={this.icon('search1', 1)} />
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
  bottomNav: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
    zIndex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});

export default Home;