import React, { Component, Fragment } from 'react';
import { StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';
import Divider from '../../components/Divider';

import styles from './styles';
import theme from '../../styles/theme';

@observer
class AgendaDetail extends Component {

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
            <Text>Lorem ipsum dolor sit amet</Text>
            <Text>{this.title}</Text>
          </View>
          <Divider />
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default AgendaDetail;