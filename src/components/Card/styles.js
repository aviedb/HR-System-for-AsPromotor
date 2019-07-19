import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: theme["background-basic-color-1"],
    borderRadius: 5,
    marginBottom: 12,
    marginHorizontal: 16
  },
  preview: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: theme["color-primary-200"],
    height: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 12
  },
  viewButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme["color-primary-default"],
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    flexDirection: 'row'
  },
  itemTitle: {
    fontWeight: 'normal'
  }
});

export default styles;