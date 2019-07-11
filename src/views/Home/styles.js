import { StyleSheet, StatusBar, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: 'white'
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
  bottomNav: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC'
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;