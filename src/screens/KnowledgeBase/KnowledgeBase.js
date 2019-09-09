import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { List, TopNavigation } from 'react-native-ui-kitten';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import moment from 'moment';

import Card from '../../components/Card';
import EmptyList from '../../components/EmptyList';
import HomeMenu from '../../components/HomeMenu';

import { db } from '../../services/firebase';
import styles from './styles';
import theme from '../../styles/theme';

@observer
class KnowledgeBase extends Component {

  @observable data = [];
  @observable isFetching = true;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.isFetching = true;
    db.getKnowledgeBase(res => {
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
      <Card 
        {...this.props} 
        item={item} 
        preview="PDF" 
        buttonText="View PDF"
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
            title="Knowledge Base"
            alignment="center"
            style={styles.header}
            titleStyle={{...styles.headerTitle, ...styles.headerCenterTitle}}
            rightControls={<HomeMenu navigation={this.props.navigation} />}
          />
          <List 
            data={this.data}
            renderItem={this.renderItem}
            ListHeaderComponent={<View style={{height: 12}}/>}
            keyExtractor={(item, index) => String(index)}
            onRefresh={this.fetchData}
            refreshing={this.isFetching}
            ListEmptyComponent={<EmptyList 
              message={this.isFetching? 'Loading...':'Empty in Knowledge Base'}
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

export default KnowledgeBase;