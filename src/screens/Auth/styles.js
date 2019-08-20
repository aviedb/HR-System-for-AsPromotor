import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import theme from '../../styles/theme';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeAreaTop: {
    flex: 0, 
    backgroundColor: theme["color-primary-default"]
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: theme["background-basic-color-1"]
  },
  header: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
  },
  container: {
    paddingHorizontal: 40,
    paddingBottom: 8,
    flex: 1
  },
  logo: {
    height: height/4,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme["color-primary-default"],
  },
  logoTitle: {
    color: theme["text-alternate-color"],
    fontWeight: 'normal',
    fontFamily: 'product_sans_bold'
  },
  logoSubtitle: {
    color: theme["text-alternate-color"],
    fontFamily: 'helvetica_neue_lt'
  },
  input: {
    marginBottom: 8
  },
  forget: {
    marginTop: 16,
    alignSelf: 'flex-end',
    color: theme["color-primary-default"]
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  create: {
    color: theme["color-primary-default"],
    fontWeight: 'bold'
  }
});

export default styles;