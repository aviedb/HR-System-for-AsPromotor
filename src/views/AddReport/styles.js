import { StyleSheet, Platform, StatusBar, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EAEEF1',
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1
  },
  image: {
    width: width,
    height: width*2/3
  },
  upload: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    width:48,
    height:48,
    top: (width*2/3)-64,
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
  }
});

export default styles;