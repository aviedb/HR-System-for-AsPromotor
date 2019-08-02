import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme["background-basic-color-3"],
    borderBottomColor: theme["border-basic-color-5"],
    borderBottomWidth: 1
  },
  image: {
    width: width,
    height: width*1/2
  },
  upload: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    width:52,
    height:52,
    top: (width*1/2)-26,
    right: 20,
    backgroundColor: theme["text-primary-color"],
    borderRadius:50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  formContainer: {
    paddingHorizontal: 32,
    paddingTop: 40
  },
  input: {
    backgroundColor: theme["background-basic-color-1"],
    borderColor: theme["border-basic-color-4"],
    marginVertical: 4
  },
  select: {
    marginVertical: 4
  },
  labelStyle: {
    color: '#1A2138'
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopColor: '#EAEEF1',
    borderTopWidth: 1
  },
  bottomSheetItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  bottomSheetItemTitle: {
    color: theme["text-hint-color"],
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
    marginLeft: 16
  },
  bottomSheetItemTitleDanger: {
    color: theme["text-danger-disabled-color"],
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
    marginLeft: 16
  }
});

export default styles;