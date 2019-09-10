import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  menuItemText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
  }
});

export default styles;