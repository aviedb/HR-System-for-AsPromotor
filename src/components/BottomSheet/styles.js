import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';
import globalStyles from '../../styles/globalStyles';

const styles = StyleSheet.create({
  ...globalStyles,
  bottomSheetModal: {
    margin: 0, 
    justifyContent: 'flex-end'
  },
  bottomSheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingBottom: 12
  },
  bottomSheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    backgroundColor: theme["background-basic-color-3"],
    borderRadius: 50,
    marginTop: 12,
    marginBottom: 12
  },
  bottomSheetTitle: {
    color: theme["text-basic-color"],
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
    fontSize: 16,
    alignSelf: 'center'
  }
});

export default styles;