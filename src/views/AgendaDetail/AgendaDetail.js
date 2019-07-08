import React, { Component, Fragment } from 'react';
import { StyleSheet, StatusBar, Platform, View, SafeAreaView } from 'react-native';
import {
  Text,
  TopNavigation,
  TopNavigationAction
} from 'react-native-ui-kitten';
import {Ionicons } from '@expo/vector-icons';

class AgendaDetail extends Component {

  static navigationOptions = {
    header: null,
  };

  state = {
    title: ''
  }

  componentDidMount() {
    const title = this.props.navigation.getParam('title', 'Title');
    this.setState({ title });
  }

  icon = (name) => () => {
    if (name === 'back') {
      name = Platform.OS === 'ios'? 'ios-arrow-back':'md-arrow-back'
    }

    return <Ionicons
      name={name}
      size={24}
      color="#22273E"
    />
  }

  render() {
    return (
      <Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: 'white'}} />
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            backgroundColor="#eee"
            barStyle="dark-content" />
          <TopNavigation
            title={this.state.title}
            alignment={Platform.OS==='android'? "start": "center"}
            leftControl={<TopNavigationAction
              icon={this.icon('back')}
              onPress={() => this.props.navigation.goBack()}
            />}
            style={styles.header}
            titleStyle={styles.headerTitle} />
          <View style={styles.container}>
            <Text>Lorem ipsum dolor sit amet</Text>
            <Text>{this.state.title}</Text>
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
    backgroundColor: '#F7F9FC'
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC'
  }
});

export default AgendaDetail;