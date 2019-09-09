import { StyleSheet, Platform, StatusBar } from 'react-native';
import theme from './theme';

const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme["background-basic-color-1"],
  },
  header: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 7,
    zIndex: 100
  },
  headerTitle: {
    fontFamily: 'product_sans_medium',
    fontWeight: "normal",
    fontSize: 18,
    color: theme["text-basic-color"],
    marginLeft: Platform.OS === 'android'? 8:0,
    paddingHorizontal: Platform.OS === 'ios'? 16:0
  },
  headerCenterTitle: {
    marginLeft: 0
  },
  container: {
    flex: 1,
    backgroundColor: theme["background-basic-color-2"]
  }
});

const calendarStyle = () => {
  const themeColor = theme["color-primary-default"];
  const lightThemeColor = theme["color-primary-100"];
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

export {
  globalStyles,
  calendarStyle
}

export default globalStyles