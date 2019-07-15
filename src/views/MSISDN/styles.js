import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  headerContainer: {
    backgroundColor: '#fff',
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 7,
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
  },
  itemTitle: {
    fontWeight: 'normal'
  }
});

export default styles;