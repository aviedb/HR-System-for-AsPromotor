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
    paddingHorizontal: 40,
    paddingTop: 40
  },
  input: {
    backgroundColor: theme["background-basic-color-1"],
    borderColor: theme["border-basic-color-4"],
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
    color: theme["text-danger-color"],
    fontWeight: 'normal',
    fontFamily: 'product_sans_medium',
    marginLeft: 16
  }
});

export default styles;