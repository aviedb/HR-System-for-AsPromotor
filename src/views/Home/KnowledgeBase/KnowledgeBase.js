import React, { Component } from 'react';
import { View } from 'react-native';
import { List, TopNavigation } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Card from '../../../components/Card';
import styles from './styles';

@observer
class KnowledgeBase extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
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

  _onRefresh = () => {
    this.isFetching = true;
    
    setTimeout(() => {
      this.isFetching = false;
    }, 2000);
  }

  renderItem = ({ item }) => {
    return (
      <Card {...this.props} {...item} />
    );
  }

  render() {
    if (this.props.selectedIndex !== 1) return <View />

    return (
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
          style={styles.container}
        />
      </View>
    );
  }
}

export default KnowledgeBase;