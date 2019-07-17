import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  calendarHeader: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    }
  },
  section: {
    backgroundColor: theme["background-basic-color-2"], 
    color: theme["text-hint-color"]
  },
  item: {
    padding: 20, 
    backgroundColor: theme["background-basic-color-1"], 
    borderBottomWidth: 1, 
    borderBottomColor: theme["border-basic-color-3"], 
    flexDirection: 'row'
  },
  itemHourText: {
    color: theme["text-primary-active-color"],
    fontFamily: 'helvetica_neue_lt'
  },
  itemDurationText: {
    color: theme["text-hint-color"], 
    fontFamily: 'helvetica_neue_lt',
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    fontFamily: 'helvetica_neue_md',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  emptyItem: {
    backgroundColor: theme["background-basic-color-1"], 
    paddingLeft: 20,
    height: 52, 
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: theme["border-basic-color-3"] 
  },
  emptyItemText: {
    color: theme["text-hint-color"],
    fontSize: 14
  }
});

export default styles;