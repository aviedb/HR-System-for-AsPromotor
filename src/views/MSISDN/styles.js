import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    backgroundColor: '#fff',
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
  header: {
    minHeight: 56,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: {
    fontFamily: 'helvetica_neue_md',
    fontWeight: "normal",
    fontSize: 16,
    lineHeight: 24,
    color: '#1A2138'
  },
  search: {
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  }
});

export default styles;