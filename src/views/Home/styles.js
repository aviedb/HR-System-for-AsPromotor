import { StyleSheet, StatusBar, Platform } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  bottomNav: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default styles;