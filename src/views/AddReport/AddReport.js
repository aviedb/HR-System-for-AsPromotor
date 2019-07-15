import React, { Component } from 'react';
import { StatusBar, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';

import styles from './styles';

backIcon = () => {
  const name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back';
  return icon.getIcon(name, Ionicons);
}

@observer
class AddReport extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor="#eee"
          barStyle="dark-content" />
        <TopNavigation
          title="Add Report"
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
        <View style={styles.container}>

        </View>
        <View style={styles.divider}/>
      </SafeAreaView>
    );
  }
}

export default AddReport;