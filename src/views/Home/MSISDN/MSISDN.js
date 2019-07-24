import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Text, Input, ListItem, List, TopNavigation } from 'react-native-ui-kitten';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../../services/stores';
import EmptyList from '../../../components/EmptyList';

import styles from './styles';

@observer
class MSISDN extends Component {

  @observable search = '';
  @observable data = [];
  @observable isFetching = false;

  componentDidMount() {
    this.isFetching = true;
    setTimeout(() => {
      this.isFetching = false;
    }, 2000);
  }

  _onRefresh = () => {
    this.isFetching = true;
    
    setTimeout(() => {
      // this.data = [
      //   { msisdn: 'MSISDN 1', shipOutDate: '2019-07-10', subAgent: 'Sub Agent 1' },
      //   { msisdn: 'MSISDN 2', shipOutDate: '2019-07-11', subAgent: 'Sub Agent 2' },
      //   { msisdn: 'MSISDN 3', shipOutDate: '2019-07-13', subAgent: 'Sub Agent 3' },
      //   { msisdn: 'MSISDN 4', shipOutDate: '2019-07-16', subAgent: 'Sub Agent 4' },
      // ];

      this.isFetching = false;
    }, 2000);
  }

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  attemptLogout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('AuthStack');
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.msisdn}
        description={`${item.subAgent}\n${item.shipOutDate}`}
        style={styles.item}
        titleStyle={styles.itemTitle}
        onPress={() => this.props.navigation.navigate('MSISDNDetail', {
          title: item.msisdn
        })}
      />
    );
  }

  renderListFooter = () => {
    return (
      <View>
        <Text onPress={this.attemptLogout}>Logout</Text>
      </View>
    );
  }

  render() {
    if (this.props.selectedIndex !== 0) return <View />

    const data = this.data.filter(e => 
      e.msisdn.toLowerCase().includes(this.search.toLowerCase()) ||
      e.subAgent.toLowerCase().includes(this.search.toLowerCase())
    );

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TopNavigation 
            title="MSISDN"
            alignment="center"
            titleStyle={{...styles.headerTitle, ...styles.headerCenterTitle}}
          />
          <View style={styles.search}>
            <Input 
              placeholder="Search by MSISDN or sub agent"
              value={this.search}
              onChangeText={this.handleChange('search')}
              size="small"
              icon={(style) => {
                let color = style.tintColor;
                delete style.tintColor;
                return icon.getIcon('search1', null, color);
              }}
            />
          </View>
        </View>
        <List 
          data={data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onRefresh={this._onRefresh}
          refreshing={this.isFetching}
          // ListFooterComponent={this.renderListFooter}
          ListEmptyComponent={<EmptyList 
            message={this.isFetching? 'Loading...':'Empty in MSISDN'}
            playAnimation={this.isFetching}
          />}
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    );
  }
}

export default MSISDN;