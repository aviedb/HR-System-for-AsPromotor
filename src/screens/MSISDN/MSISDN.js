import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { Input, List, ListItem, TopNavigation } from 'react-native-ui-kitten';
import _ from 'lodash';
import moment from 'moment';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { icon } from '../../services/stores';
import EmptyList from '../../components/EmptyList';
import HomeMenu from '../../components/HomeMenu';
import { db } from '../../services/firebase';

import styles from './styles';
import theme from '../../styles/theme';

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

    db.getMSISDN(res => {
      let data = res.docs.map(doc => {
        doc = doc.data();
        doc.shipOutDate = moment(doc.shipOutDate.toDate()).format("D MMMM YYYY");

        if (doc.sold) doc.msisdn = `(SOLD) ${doc.msisdn}`;
        return doc;
      }).sort((a, b) => (a.sold === b.sold)? 0 : a.sold? 1 : -1); // sort to display SOLD numbers last
      
      this.data = data;
      this.isFetching = false;
    });
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
        titleStyle={styles.itemTitle}
        descriptionStyle={styles.itemSubtitle}
      />
    );
  }

  render() {
    const data = this.data.filter(e => 
      e.msisdn.toLowerCase().includes(this.search.toLowerCase()) ||
      e.subAgent.toLowerCase().includes(this.search.toLowerCase())
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          backgroundColor={theme["status-bar-android"]}
          barStyle="dark-content"
        />
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TopNavigation 
              title="MSISDN"
              alignment="center"
              titleStyle={{...styles.headerTitle, ...styles.headerCenterTitle}}
              rightControls={<HomeMenu navigation={this.props.navigation} />}
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
                  return icon.getIcon({ name: 'search1', color });
                }}
              />
            </View>
          </View>
          <List 
            data={data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => String(index)}
            onRefresh={this.fetchData}
            refreshing={this.isFetching}
            ListEmptyComponent={<EmptyList 
              message={this.isFetching? 'Loading...':'Empty in MSISDN'}
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

export default MSISDN;