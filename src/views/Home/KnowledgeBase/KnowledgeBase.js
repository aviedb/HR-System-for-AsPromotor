import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { List, TopNavigation } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Card from '../../../components/Card';
import EmptyList from '../../../components/EmptyList';
import styles from './styles';
import theme from '../../../styles/theme';

@observer
class KnowledgeBase extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    setTimeout(() => {
      
      this.isFetching = false;
    }, 2000);
  }

  _onRefresh = () => {
    this.isFetching = true;
    
    setTimeout(() => {
      this.data = [
        { title: 'Knowledge Base 1', createdAt: '2019-06-20' },
        { title: 'Knowledge Base 2', createdAt: '2019-06-25' },
        { title: 'Knowledge Base 3', createdAt: '2019-07-01' },
        { title: 'Knowledge Base 4', createdAt: '2019-07-04' },
      ];

      this.isFetching = false;
    }, 2000);
  }

  renderItem = ({ item }) => {
    return (
      <Card {...this.props} {...item} />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme["status-bar-android"]}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <TopNavigation
            title="Knowledge Base"
            alignment="center"
            style={styles.header}
            titleStyle={{...styles.headerTitle, ...styles.headerCenterTitle}}
          />
          <List 
            data={this.data}
            renderItem={this.renderItem}
            ListHeaderComponent={<View style={{height: 12}}/>}
            keyExtractor={(item, index) => String(index)}
            onRefresh={this._onRefresh}
            refreshing={this.isFetching}
            ListEmptyComponent={<EmptyList 
              message={this.isFetching? 'Loading...':'Empty in Knowledge Base'}
              playAnimation={this.isFetching}
            />}
            contentContainerStyle={{ flexGrow: 1 }}
            style={styles.container}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default KnowledgeBase;