import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { TopNavigation, Text } from 'react-native-ui-kitten';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

import { db } from '../../services/firebase';
import Fab from '../../components/FloatingActionButton';
import Touchable from '../../components/Touchable';
import EmptyList from '../../components/EmptyList';

import styles from './styles';
import theme from '../../styles/theme';
import { calendarStyle } from '../../styles/globalStyles';
import { icon } from '../../services/stores';

const today = new Date().toISOString().split('T')[0];

@observer
class ASproReport extends Component {

  @observable items = [];
  @observable isFetching = true;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    db.getAsProReport(res => {
      let data = res.docs.map(doc => {
        doc = doc.data();
        doc.hour = moment(doc.date.toDate()).format('HH:mm');
        doc.formattedDate = moment(doc.date.toDate()).format('YYYY-MM-DD');
        let split = doc.note.split('\n');
        doc.notePreview = split.length === 1? split[0] : `${split[0]} ...`;
        return doc;
      });

      let items = [];
      let dateKeys = _.groupBy(data, 'formattedDate');

      _.mapKeys(dateKeys, (data, title) => {
        items.push({ title, data });
      });

      this.items = items;
      this.isFetching = false;
    });
  }

  getMarkedDates = () => {
    const marked = {};
    this.items.slice().forEach(item => {
      // only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {marked: true};
      }
    });
    return marked;
  }

  renderEmptyItem() {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <Touchable activeOpacity={.7} onPress={() => this.props.navigation.navigate('AgendaDetail', {
        item: item
      })}>
        <View style={styles.item}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.itemHourText}>{item.hour}</Text>
          </View>
          <View style={{ paddingLeft: 20, flex: 1 }}>
            <Text style={styles.itemTitleText}>{item.title}</Text>
            {!!item.notePreview &&
              <Text style={styles.itemNoteText}>{item.notePreview}</Text>
            }
          </View>
        </View>
      </Touchable>
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
            title="ASpro Report"
            alignment="center"
            style={styles.header}
            titleStyle={styles.headerTitle}
          />
          <CalendarProvider date={today} disabledOpacity={0.6}>
            <ExpandableCalendar 
              // horizontal={false}
              // hideArrows
              // disablePan
              // hideKnob
              // initialPosition={'open'} // ExpandableCalendar.positions.OPEN - can't find static positions
              markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
              theme={calendarStyle()}
              leftArrowImageSource={require('../../assets/images/previous.png')}
              rightArrowImageSource={require('../../assets/images/next.png')}
              style={styles.calendarHeader}
              // headerStyle={styles.calendar} // for horizontal only
            />
            <AgendaList
              sections={this.items.slice()}
              renderItem={this.renderItem}
              sectionStyle={styles.section}
              ListEmptyComponent={<EmptyList 
                message={this.isFetching? 'Loading...':'Empty in Schedule'}
                playAnimation={false}
              />}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </CalendarProvider>
          <Fab 
            underlayColor={theme["color-primary-active"]}
            onPress={() => this.props.navigation.navigate('AddReport')}
            style={styles.fab}
          >
            {icon.getIcon({ name: 'plus', color: '#fff' })}
          </Fab>
        </View>
      </SafeAreaView>
    );
  }
}

export default ASproReport;