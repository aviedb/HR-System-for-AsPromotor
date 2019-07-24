import React, { Component } from 'react';
import { StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab
} from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { icon } from '../../services/stores';
import MSISDN from './MSISDN';
import KnowledgeBase from './KnowledgeBase';
import ASproReport from './ASproReport';
import PayrollSlip from './PayrollSlip';
import Schedule from './Schedule';

import styles from './styles';
import theme from '../../styles/theme';

@observer
class Home extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable selectedIndex = 0;
  @observable location = '';
  @observable errorMessage = '';

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.errorMessage = 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
    } else {
      this.getLocationAsync();
    }
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.errorMessage = 'Permission to access location was denied';
    }

    let location = await Location.getCurrentPositionAsync({});
    this.location = location;
  };

  onTabSelect = (selectedIndex) => {
    this.selectedIndex = selectedIndex;
  };

  icon = (name, index) => (style) => {
    delete style.tintColor;
    let color = theme["icon-basic-color"];
    if (index !== null){ 
      color = this.selectedIndex === index 
        ? theme["icon-active-color"]
        : theme["icon-control-color"];
    }

    return icon.getIcon(name, null, color);
  }

  render() {

    let text = 'Waiting..';
    if (this.errorMessage) {
      text = this.errorMessage;
    } else if (this.location) {
      text = JSON.stringify(this.location);
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme["status-bar-android"]}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <MSISDN {...this.props} selectedIndex={this.selectedIndex}/>
          <KnowledgeBase {...this.props} selectedIndex={this.selectedIndex}/>
          <ASproReport {...this.props} selectedIndex={this.selectedIndex}/>
          <PayrollSlip {...this.props} selectedIndex={this.selectedIndex}/>
          <Schedule {...this.props} selectedIndex={this.selectedIndex}/>
        </View>
        <BottomNavigation
          style={styles.bottomNav}
          selectedIndex={this.selectedIndex}
          indicatorStyle={{height: 0}}
          onSelect={this.onTabSelect}
        >
          <BottomNavigationTab icon={this.icon('home', 0)} />
          <BottomNavigationTab icon={this.icon('iconfontdesktop', 1)} />
          <BottomNavigationTab icon={this.icon('pluscircle', 2)} />
          <BottomNavigationTab icon={this.icon('mail', 3)} />
          <BottomNavigationTab icon={this.icon('calendar', 4)} />
        </BottomNavigation>
      </SafeAreaView>
    );
  }
}

export default Home;