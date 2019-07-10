import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Text, Input, ListItem, List } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';

@observer
class MSISDN extends Component {

  @observable search = '';
  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    setTimeout(() => {
      this.data = [
        { msisdn: 'MSISDN 1', shipOutDate: '2019-07-10', subAgent: 'Sub Agent 1' },
        { msisdn: 'MSISDN 2', shipOutDate: '2019-07-11', subAgent: 'Sub Agent 2' },
        { msisdn: 'MSISDN 3', shipOutDate: '2019-07-13', subAgent: 'Sub Agent 3' },
        { msisdn: 'MSISDN 4', shipOutDate: '2019-07-16', subAgent: 'Sub Agent 4' },
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

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.msisdn}
        description={`${item.subAgent}\n${item.shipOutDate}`}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('MSISDNDetail', {
          title: item.msisdn
        })}
      />
    );
  }

  render() {
    if (this.props.selectedIndex !== 0) return <View />

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>MSISDN</Text>
          </View>
          <View style={styles.search}>
            <Input 
              placeholder="Search..."
              value={this.search}
              onChangeText={this.handleChange('search')}
              size="small"
              icon={() => icon.getIcon('search1', null, '#909DB4')}
            />
          </View>
        </View>
        <List 
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onRefresh={this._onRefresh}
          refreshing={this.isFetching}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#fff',
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
  header: {
    minHeight: 56,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontFamily: 'helvetica_neue_md',
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2138'
  },
  search: {
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  }
});

export default MSISDN;