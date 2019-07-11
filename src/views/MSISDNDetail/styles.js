import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: '#fff',
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
    fontSize: 16,
    marginHorizontal: Platform.OS==='ios'? 16:0
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC'
  },
  divider: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  }
});

export default styles;