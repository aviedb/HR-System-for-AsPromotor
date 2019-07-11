import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, WebView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import {Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';

import styles from './styles';

backIcon = () => {
  const name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back'
  return icon.getIcon(name, Ionicons);
}

@observer
class KnowledgeDetail extends Component {

  static navigationOptions = {
    header: null,
  };

  @observable title = '';

  componentDidMount() {
    const title = this.props.navigation.getParam('title', 'Title');
    this.title = title;
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
              source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
            />
            <View style={styles.divider}/>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default KnowledgeDetail;