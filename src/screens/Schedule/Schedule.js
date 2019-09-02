import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, View, SafeAreaView, StatusBar } from 'react-native';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { ExpandableCalendar, CalendarProvider, AgendaList } from 'react-native-calendars';
import { Text, TopNavigation } from 'react-native-ui-kitten';
import moment from 'moment';

import Touchable from '../../components/Touchable';
import EmptyList from '../../components/EmptyList';

import { db } from '../../services/firebase';
import styles from './styles';
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
      <Touchable activeOpacity={.7} onPress={() => this.props.navigation.navigate('AgendaDetail', {
        item: item
      })}>
        <View style={styles.item}>
          <View style={{ justifyContent: 'center' }}>
            <Text style={styles.itemHourText}>{item.hour}</Text>
          </View>
          <View style={{ paddingLeft: 20, flex: 1 }}>
            <Text style={styles.itemTitleText}>{item.title}</Text>
            <Text style={styles.itemNoteText}>{item.notePreview}</Text>
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
              theme={this.getTheme()}
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