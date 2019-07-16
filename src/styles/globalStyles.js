import { StyleSheet, Platform, StatusBar } from 'react-native';

const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
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
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  divider: {
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  }
});

export default globalStyles