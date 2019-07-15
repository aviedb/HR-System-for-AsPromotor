import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  webviewState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;