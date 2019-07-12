import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, WebView, Linking } from 'react-native';
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
class PdfViewer extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable title = '';
  @observable uri = '';

  componentDidMount() {
    this.title = this.props.navigation.getParam('title', 'PDF Viewer');
    this.uri = this.props.navigation.getParam('uri', 'http://www.africau.edu/images/default/sample.pdf');

    // this is temporary?
    // WebView cannot display pdf for android for some reason
    if (Platform.OS === 'android') {
      this.props.navigation.goBack();
      Linking.openURL(this.uri);
    }
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            backgroundColor="#eee"
            barStyle="dark-content" />
          <TopNavigation
            title={this.title}
            alignment={Platform.OS==='android'? "start": "center"}
            leftControl={<TopNavigationAction
              icon={backIcon}
              onPress={() => this.props.navigation.goBack()}
            />}
            style={styles.header}
            titleStyle={styles.headerTitle} />
          <View style={styles.container}>
            <WebView
              bounces={false}
              scrollEnabled={false}
              source={{ uri: this.uri }}
            />
            <View style={styles.divider}/>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default PdfViewer;