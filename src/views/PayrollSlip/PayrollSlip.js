import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { ListItem, List, TopNavigation } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from 'moment';

import EmptyList from '../../components/EmptyList';

import { db } from '../../services/firebase';
import styles from './styles';
import theme from '../../styles/theme';

@observer
class PayrollSlip extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    this.fetchData();
  }

  _onRefresh = () => {
    this.fetchData();
  }
  
  fetchData = () => {
    this.isFetching = true;
    db.getPayrollSlip().onSnapshot(res => {
      let data = res.docs.map(doc => {
        doc = doc.data();
        doc.createdAt = moment(doc.createdAt.toDate()).format("D MMM, hh:mm A");
        return doc;
      });

      this.data = data;
      this.isFetching = false;
    });
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.title}
        description={item.createdAt}
        style={styles.item}
        titleStyle={styles.itemTitle}
        onPress={() => this.props.navigation.navigate('PdfViewer', {
          item: item
        })}
      />
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
            title="Payroll Slip"
            alignment="center"
            style={styles.header}
            titleStyle={{...styles.headerTitle, ...styles.headerCenterTitle}}
          />
          <List 
            data={this.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => String(index)}
            onRefresh={this._onRefresh}
            refreshing={this.isFetching}
            ListEmptyComponent={<EmptyList 
              message={this.isFetching? 'Loading...':'Empty in Payroll Slip'}
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

export default PayrollSlip;