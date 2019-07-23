import { StyleSheet, Platform } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginBottom: 2
  },
  input: {
    backgroundColor: theme["background-basic-color-1"],
    borderColor: theme["border-basic-color-4"],
    borderWidth: 1,
    borderRadius: 4,
    padding: Platform.OS === 'ios'? 15:0
  },
  value: {
    alignSelf: Platform.OS === 'ios'? 'flex-start':null,
    color: theme["text-hint-color"],
    fontFamily: null
  }
});

export default styles;