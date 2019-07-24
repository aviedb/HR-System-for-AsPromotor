import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  lottie: {
    height: 200,
    width: 200
  },
  title: {
    fontFamily: 'product_sans_regular',
    fontSize: 20,
    color: theme["text-hint-color"]
  }
});

export default styles;