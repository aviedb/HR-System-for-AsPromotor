import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  item: {
    borderBottomColor: theme["border-basic-color-3"],
    borderBottomWidth: 1
  },
  itemTitle: {
    fontWeight: 'normal'
  }
});

export default styles;