import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  item: {
    borderBottomColor: '#EAEEF1',
    borderBottomWidth: 1
  },
  itemTitle: {
    fontWeight: 'normal'
  }
});

export default styles;