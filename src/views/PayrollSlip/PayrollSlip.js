import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { ListItem, List } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

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
        onPress={() => this.props.navigation.navigate('PayrollDetail', {
          title: item.title
        })}
      />
    );
  }

  render() {
    if (this.props.selectedIndex !== 3) return <View />

    return (
      <View style={styles.container}>
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
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  }
});

export default PayrollSlip;