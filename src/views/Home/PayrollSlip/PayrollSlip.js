import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, List, TopNavigation } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import styles from './styles';

@observer
class PayrollSlip extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    setTimeout(() => {
      this.data = [
        { title: 'Payroll Slip 1', createdAt: '2019-06-29' },
        { title: 'Payroll Slip 2', createdAt: '2019-07-01' },
        { title: 'Payroll Slip 3', createdAt: '2019-07-03' },
        { title: 'Payroll Slip 4', createdAt: '2019-07-10' },
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
    if (this.props.selectedIndex !== 3) return <View />

    return (
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
          style={styles.container}
        />
      </View>
    );
  }
}

export default PayrollSlip;