import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAECEE',
    borderBottomColor: '#DADADA',
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
    backgroundColor:'#3267FF',
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
    backgroundColor: '#FFFFFF',
    borderColor: '#D3DDE9',
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
  }
});

export default styles;