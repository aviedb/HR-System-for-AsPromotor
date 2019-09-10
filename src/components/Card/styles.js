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
    borderRadius: 4,
    marginBottom: 12,
    marginHorizontal: 16
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
    paddingHorizontal: 16,
    paddingVertical: 16
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
  previewText: {
    color: theme["color-primary-500"],
    fontSize: 20,
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium'
  },
  titleText: {
    fontFamily: 'helvetica_neue_md',
    fontSize: 16
  },
  subtitleText: {
    color: theme["text-hint-color"],
    fontFamily: 'helvetica_neue_lt',
    fontSize: 16,
    marginTop: 4
  },
  buttonText: {
    color: theme["text-alternate-color"],
    fontFamily: 'helvetica_neue_lt',
    fontSize: 16,
  }
});

export default styles;