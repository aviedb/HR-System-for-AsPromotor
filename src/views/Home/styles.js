import { StyleSheet, StatusBar, Platform } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  bottomNav: {
    borderTopColor: theme["border-basic-color-3"],
    borderTopWidth: 1
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;