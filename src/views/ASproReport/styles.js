import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 3,
    zIndex: 1
  },
  headerTitle: {
    fontFamily: 'helvetica_neue_md',
    fontWeight: "normal",
    fontSize: 16
  },
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
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