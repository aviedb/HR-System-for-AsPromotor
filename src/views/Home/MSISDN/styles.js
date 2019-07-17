import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../../styles/globalStyles';
import theme from '../../../styles/theme';

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
  search: {
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  item: {
    borderBottomColor: theme["border-basic-color-3"],
    borderBottomWidth: 1
  },
  itemTitle: {
    fontWeight: 'normal',
  }
});

export default styles;