import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { TopNavigation, TopNavigationAction, Text } from 'react-native-ui-kitten';

import theme from '../../styles/theme';
import styles from './styles';
import { icon } from '../../services/stores';
import Divider from '../../components/Divider';

class Profile extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme["status-bar-android"]}
          barStyle="dark-content" />
        <TopNavigation
          title="Profile"
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={icon.backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle} />
        <View style={styles.container}>
          <Text>PROFILE</Text>
        </View>
        <Divider />
      </SafeAreaView>
    );
  }
}

export default Profile;