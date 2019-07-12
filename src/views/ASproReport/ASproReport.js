import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, List, TopNavigation, Text } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import Fab from '../../components/FloatingActionButton';

import styles from './styles';
import { icon } from '../../services/stores';

@observer
class ASproReport extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    setTimeout(() => {
      this.data = [
        { title: 'ASpro Report 1', createdAt: '2019-06-20' },
        { title: 'ASpro Report 2', createdAt: '2019-06-25' },
        { title: 'ASpro Report 3', createdAt: '2019-07-01' },
        { title: 'ASpro Report 4', createdAt: '2019-07-04' },
        { title: 'ASpro Report 1', createdAt: '2019-06-20' },
        { title: 'ASpro Report 2', createdAt: '2019-06-25' },
        { title: 'ASpro Report 3', createdAt: '2019-07-01' },
        { title: 'ASpro Report 4', createdAt: '2019-07-04' },
        { title: 'ASpro Report 1', createdAt: '2019-06-20' },
        { title: 'ASpro Report 2', createdAt: '2019-06-25' },
        { title: 'ASpro Report 3', createdAt: '2019-07-01' },
        { title: 'ASpro Report 4', createdAt: '2019-07-04' },
        { title: 'ASpro Report 1', createdAt: '2019-06-20' },
        { title: 'ASpro Report 2', createdAt: '2019-06-25' },
        { title: 'ASpro Report 3', createdAt: '2019-07-01' },
        { title: 'ASpro Report 4', createdAt: '2019-07-04' },
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
      <ListItem 
        title={item.title}
        description={item.createdAt}
        style={styles.item}
        titleStyle={styles.itemTitle}
        onPress={() => this.props.navigation.navigate('PdfViewer', {
          title: item.title
        })}
      />
    );
  }

  render() {
    if (this.props.selectedIndex !== 2) return <View />

    return (
      <View style={styles.container}>
        <TopNavigation
          title="ASpro Report"
          alignment="center"
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
        <List 
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onRefresh={this._onRefresh}
          refreshing={this.isFetching}
        />
        <Fab onPress={() => this.props.navigation.navigate('PdfViewer')}>
          {icon.getIcon('plus', null, '#fff')}
        </Fab>
      </View>
    );
  }
}

export default ASproReport;