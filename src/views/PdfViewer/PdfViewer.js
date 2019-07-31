import React, { Component } from 'react';
import { StatusBar, Platform, View, WebView, Linking, SafeAreaView } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';
import Divider from '../../components/Divider';

import styles from './styles';
import theme from '../../styles/theme';

@observer
class PdfViewer extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable title = '';
  @observable uri = '';

  componentWillMount() {
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
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme["status-bar-android"]}
          barStyle="dark-content" />
        <TopNavigation
          title={this.title}
          alignment={Platform.OS==='android'? "start": "center"}
          leftControl={<TopNavigationAction
            icon={icon.backIcon}
            onPress={() => this.props.navigation.goBack()}
          />}
          style={styles.header}
          titleStyle={styles.headerTitle} />
        <View style={styles.container}>
          {this.uri &&
            <WebView
              bounces={false}
              scrollEnabled={false}
              source={{ uri: this.uri }}
            />
          }
        </View>
        <Divider />
      </SafeAreaView>
    );
  }
}

export default PdfViewer;