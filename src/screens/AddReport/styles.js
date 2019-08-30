import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  imageBackground: {
    width: width/3,
    height: width/4,
    marginHorizontal: 4,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  imageStyle: {
    borderRadius: 4,
  },
  fab: {
    top: (width/8)-20,
    alignItems: 'center',
    justifyContent:'center',
    width:40,
    height:40,
    backgroundColor: theme["color-primary-default"],
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
    paddingTop: 40,
    paddingBottom: 16
  },
  input: {
    backgroundColor: theme["background-basic-color-1"],
    borderColor: theme["border-basic-color-4"],
    marginVertical: 4
  },
  soldNumberWrapper: {
    borderColor: theme["border-basic-color-5"],
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme["background-basic-color-3"]
  },
  soldNumberItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  select: {
    marginVertical: 4
  },
  labelStyle: {
    color: '#1A2138'
  },
  uploadButton: {
    marginBottom: 16,
    marginLeft: 32,
    alignItems: 'flex-start'
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
  },
  msisdnContainer: {
    backgroundColor: theme["background-basic-color-2"]
  },
  msisdnItem: {
    borderBottomColor: theme["border-basic-color-3"],
    borderBottomWidth: 1,
  },
  msisdnItemTitle: {
    fontWeight: 'normal',
  },
  search: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: theme["background-basic-color-2"]
  },
});

export default styles;