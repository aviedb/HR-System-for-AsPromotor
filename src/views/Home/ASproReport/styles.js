import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  },
  itemTitle: {
    fontWeight: 'normal'
  },
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
  }
});

export default styles;