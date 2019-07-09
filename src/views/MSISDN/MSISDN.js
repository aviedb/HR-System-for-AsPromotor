import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View
} from 'react-native';
import { Text, Input, ListItem, List } from 'react-native-ui-kitten';
import { AntDesign } from '@expo/vector-icons';

class MSISDN extends Component {

  state = {
    search: '',
    data: [],
    isFetching: true
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        data: [
          { MSISDN: 'MSISDN 1', shipOutDate: '2019-07-10', subAgent: 'Sub Agent 1' },
          { MSISDN: 'MSISDN 2', shipOutDate: '2019-07-11', subAgent: 'Sub Agent 2' },
          { MSISDN: 'MSISDN 3', shipOutDate: '2019-07-13', subAgent: 'Sub Agent 3' },
          { MSISDN: 'MSISDN 4', shipOutDate: '2019-07-16', subAgent: 'Sub Agent 4' },
        ],
        isFetching: false
      })
    }, 2000);
  }

  _onRefresh = () => {
    this.setState({ isFetching: true});
    
    setTimeout(() => {
      this.setState({ 
        isFetching: false
      });
    }, 2000);
  }

  handleChange = (key) => (value) => {
    this.setState({ [key]: value });
  }

  icon = (name) => () => {
    return <AntDesign
      name={name}
      size={24}
      color="#909DB4"
    />
  }

  renderItem = ({ item }) => {
    return (
      <ListItem 
        title={item.MSISDN}
        description={`${item.subAgent}\n${item.shipOutDate}`}
        style={styles.item}
        onPress={() => this.props.navigation.navigate('MSISDNDetail', {
          title: item.MSISDN
        })}
      />
    );
  }

  renderListHeader = () => {
    return (
      <View>
        <Text>Hehe</Text>
      </View>
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
              placeholder="Search"
              value={this.state.search}
              onChangeText={this.handleChange('search')}
              size="small"
              icon={this.icon('search1')}
            />
          </View>
        </View>
        <List 
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => String(index)}
          onRefresh={this._onRefresh}
          refreshing={this.state.isFetching}
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
    borderBottomWidth: 1,
  }
});

export default MSISDN;