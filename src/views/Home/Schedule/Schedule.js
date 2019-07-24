import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, View } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import { Text } from 'react-native-ui-kitten';

import Touchable from '../../../components/Touchable';
import EmptyList from '../../../components/EmptyList';

import styles from './styles';
import theme from '../../../styles/theme';

// generate dummy dates dummy dates
const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3); 
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(days) {
  const array = [];
  for (let index = 1; index <= days; index++) {
    const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}

function getPastDate(days) {
  return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

@observer
class ExpandableCalendarScreen extends Component {

  @observable items = [
    
  ]

  onDateChanged = (date, updateSource) => {
    console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  }

  onMonthChange = (month, updateSource) => {
    // console.log('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
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

  getTheme = () => {
    const themeColor = theme["color-primary-default"];
    const lightThemeColor = theme["color-primary-disabled"];
    const disabledColor = theme["color-basic-disabled"];
    const black = theme["text-basic-color"];
    const grey = theme["text-hint-color"];
    const white = theme["text-alternate-color"];
    
    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontFamily: 'product_sans_medium',
      textMonthFontSize: 18,
      // day names
      textSectionTitleColor: grey,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'product_sans_medium',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'product_sans_regular',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
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
      <Touchable 
        onPress={() => this.props.navigation.navigate('AgendaDetail', {
          title: item.title
        })} 
      >
        <View style={styles.item}>
          <View>
            <Text style={styles.itemHourText}>{item.hour}</Text>
            <Text style={styles.itemDurationText}>{item.duration}</Text>
          </View>
          <View style={{paddingLeft: 16}}>
            <Text style={styles.itemTitleText}>{item.title}</Text>
          </View>
        </View>
      </Touchable>
    );
  }

  render() {
    return (
      <CalendarProvider
        date={today} 
        onDateChanged={this.onDateChanged} 
        onMonthChange={this.onMonthChange}
        disabledOpacity={0.6}
      >
        <ExpandableCalendar 
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={'open'} // ExpandableCalendar.positions.OPEN - can't find static positions
          markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          theme={this.getTheme()}
          leftArrowImageSource={require('../../../assets/previous.png')}
          rightArrowImageSource={require('../../../assets/next.png')}
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
    );
  }
}

export default ExpandableCalendarScreen;