import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, ListItem, List, TopNavigation, TopNavigationAction } from 'react-native-ui-kitten';
import _ from 'lodash';
import moment from 'moment';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../../services/stores';
import EmptyList from '../../../components/EmptyList';
import { auth, db } from '../../../services/firebase';

import styles from './styles';

@observer
class MSISDN extends Component {

  @observable search = '';
  @observable data = [];
  @observable isFetching = false;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.isFetching = true;
    db.getMSISDN().then(res => {
      let data = res.docs.map(doc => doc.data());
      this.data = data;
      this.isFetching = false;
    }).catch(err => {
      console.warn(err);
    });
  }

  _onRefresh = () => {
    this.fetchData();
  }

  handleChange = (key) => (value) => {
    this[key] = value;
  }

  attemptLogout = async () => {
    console.log('Signing out');

    auth.doSignOut()
      .then(() => {
        console.log('Signed out');
        this.props.navigation.navigate('AuthStack');
      }).catch(err => {
        console.warn(err);
      });
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.msisdn}
        description={`${item.subAgent}\n${moment(item.shipOutDate.toDate()).format("dddd, MMMM Do YYYY")}`}
        style={styles.item}
        titleStyle={styles.itemTitle}
        onPress={() => this.props.navigation.navigate('MSISDNDetail', {
          title: item.msisdn
        })}
      />
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
            rightControls={<TopNavigationAction
              icon={() => icon.getIcon('logout')}
              onPress={this.attemptLogout}
            />}
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
          ListEmptyComponent={<EmptyList 
            message={this.isFetching? 'Loading...':'Empty in MSISDN'}
            playAnimation={this.isFetching}
          />}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.container}
        />
      </View>
    );
  }
}

export default MSISDN;