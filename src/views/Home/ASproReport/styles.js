import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import theme from '../../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    width:56,
    height:56,
    bottom: 16,
    right: 20,
    backgroundColor: theme["color-primary-default"],
    borderRadius:50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  calendarHeader: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 0,
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
    color: theme["text-hint-color"],
    fontFamily: 'product_sans_regular',
    fontSize: 16
  },
  itemTitleText: {
    fontFamily: 'helvetica_neue_md',
    fontSize: 16
  },
  itemNoteText: {
    color: theme["text-hint-color"],
    fontFamily: 'helvetica_neue_lt',
    fontSize: 16,
    marginTop: 4,
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