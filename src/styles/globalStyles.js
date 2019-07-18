import { StyleSheet, Platform, StatusBar } from 'react-native';
import theme from './theme';

const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme["background-basic-color-1"],
  },
  header: {
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 7,
    zIndex: 100
  },
  headerTitle: {
    fontFamily: 'product_sans_medium',
    fontWeight: "normal",
    fontSize: 18,
    color: theme["text-basic-color"],
    marginLeft: Platform.OS === 'android'? 8:0,
    paddingHorizontal: Platform.OS === 'ios'? 16:0
  },
  headerCenterTitle: {
    marginLeft: 0
  },
  container: {
    flex: 1,
    backgroundColor: theme["background-basic-color-2"]
  }
});

export default globalStyles