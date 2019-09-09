import _ from 'lodash';
import React, { Component } from 'react';
import { View, SafeAreaView, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import { Text, TopNavigation } from 'react-native-ui-kitten';
import moment from 'moment';

import Touchable from '../../components/Touchable';
import EmptyList from '../../components/EmptyList';

import { db } from '../../services/firebase';
import styles from './styles';
import { calendarStyle } from '../../styles/globalStyles';
import theme from '../../styles/theme';

const today = new Date().toISOString().split('T')[0];

@observer
class ExpandableCalendarScreen extends Component {

  @observable items = [];
  @observable isFetching = true;

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    db.getSchedule(res => {
      let data = res.docs.map(doc => {
        doc = doc.data();
        console.log(doc.start)
        doc.startHour = moment(doc.start.toDate()).format('HH:mm');
        doc.endHour = moment(doc.end.toDate()).format('HH:mm');
        doc.formattedDate = moment(doc.start.toDate()).format('YYYY-MM-DD');
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

    let color = {
      approved: theme["text-success-color"],
      declined: theme["text-danger-color"],
      processing: theme["text-warning-color"]
    }
    
    return (
      <Touchable activeOpacity={.7}>
        <View style={styles.item}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.itemHourText}>{`${item.startHour} -`}</Text>
            <Text style={styles.itemHourText}>{item.endHour}</Text>
          </View>
          <View style={{ paddingLeft: 20, flex: 1 }}>
            <Text style={styles.itemTitleText}>{item.location}</Text>
            <Text style={{...styles.itemNoteText, color: color[item.status] || theme["text-hint-color"]}}>
              {item.status}
            </Text>
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
            title="Schedule"
            alignment="center"
            style={styles.header}
            titleStyle={styles.headerTitle}
          />
          <CalendarProvider
            date={today} 
            onDateChanged={this.onDateChanged} 
            onMonthChange={this.onMonthChange}
            disabledOpacity={0.6}
          >
            <ExpandableCalendar 
              markedDates={this.getMarkedDates()}
              theme={calendarStyle()}
              leftArrowImageSource={require('../../assets/images/previous.png')}
              rightArrowImageSource={require('../../assets/images/next.png')}
              style={styles.calendarHeader}
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
        </View>
      </SafeAreaView>
    );
  }
}

export default ExpandableCalendarScreen;