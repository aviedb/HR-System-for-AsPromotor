import { StyleSheet, Platform, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  ...globalStyles,
  headerContainer: {
    backgroundColor: '#fff',
    shadowColor: '#858F96',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 6,
      width: 0
    },
    elevation: 7,
    zIndex: 1
  },
  search: {
    paddingHorizontal: 16,
    paddingBottom: 8
  },
  container: {
    flex: 1,
    backgroundColor: theme["background-basic-color-2"],
    marginTop: -1
  },
  item: {
    borderTopColor: theme["border-basic-color-2"],
    borderTopWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  preview: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: theme["color-primary-100"],
    height: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  itemTitle: {
    fontWeight: 'normal',
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
    color: theme["text-basic-color"]
  }
});

export default styles;