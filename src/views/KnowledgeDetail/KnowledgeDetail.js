import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, Platform, View, WebView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import {Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: '#fff',
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
    fontSize: 16,
    marginHorizontal: Platform.OS==='ios'? 16:0
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC'
  },
  webviewState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  divider: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  }
});

export default KnowledgeDetail;