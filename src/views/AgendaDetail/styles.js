import { StyleSheet, Platform, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  carouselContainer: {
    width: width*80/100, 
    height: width*60/100, 
    marginTop: 20
  },
  parallaxContainer: {flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8
  },
  parallaxStyle: {
    ...StyleSheet.absoluteFillObject,
    width: width*80/100, 
    height: width*60/100,
    resizeMode: 'cover'
  },
  paginationContainer: { 
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 12
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
});

export default styles;