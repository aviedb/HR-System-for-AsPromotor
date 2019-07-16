import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  fab: {
    zIndex: 10,
    alignItems:'center',
    justifyContent:'center',
    width:48,
    height:48,
    position: 'absolute',                                       
    bottom: 16,                                                    
    right: 20,
    backgroundColor:'#3267FF',
    borderRadius:100,
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
    backgroundColor: '#fafafa', 
    color: '#79838a'
  },
  item: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black',
    fontFamily: 'helvetica_neue_lt'
  },
  itemDurationText: {
    color: 'grey', 
    fontFamily: 'helvetica_neue_lt',
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    fontFamily: 'helvetica_neue_md',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  emptyItem: {
    backgroundColor: 'white', 
    paddingLeft: 20,
    height: 52, 
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0' 
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});

export default styles;