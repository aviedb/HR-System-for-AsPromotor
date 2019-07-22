import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: theme["text-primary-color"],
    borderRadius: 4,
    alignItems: 'center'
  },
  text: {
    color: theme["text-alternate-color"],
  }
});

export default styles;