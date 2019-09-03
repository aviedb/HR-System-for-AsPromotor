import { StyleSheet, Platform, Dimensions } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import theme from '../../styles/theme';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  ...globalStyles,
  container: {
    ...globalStyles.container,
    backgroundColor: theme["backgorund-basic-color-1"]
  },
  carouselContainer: {
    top: -1,
    backgroundColor: theme["background-basic-color-2"],
    borderTopColor: theme["border-basic-color-4"],
    borderBottomColor: theme["border-basic-color-4"],
    borderBottomWidth: 1,
    borderTopWidth: 1,
    minHeight: (width*60/100) + 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  parallaxView: {
    width: width*80/100, 
    height: width*60/100, 
    marginTop: 20,
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
  },
  noPhoto: {
    color: theme["text-hint-color"],
    fontSize: 18,
    fontFamily: 'product_sans_regular'
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20
  },
  textStok: {
    fontFamily: 'product_sans_medium',
    fontWeight: 'normal'
  },
  dateWrapper: {
    flexDirection: 'row',
    borderBottomColor: theme["border-basic-color-4"],
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingVertical: 4
  },
  textDate: {
    fontFamily: 'product_sans_light',
    fontSize: 16,
    color: theme["text-hint-color"],
  },
  textEmail: {
    fontFamily: 'product_sans_regular',
    fontSize: 16,
    color: theme["text-hint-color"],
  },
  textNote: {
    fontFamily: 'helvetica_neue_lt',
    color: theme["text-basic-color"],
    fontSize: 16,
    marginBottom: 20,
  },
  soldNumberTitle: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: theme["background-basic-color-3"],
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  soldNumberTitleText: {
    fontFamily: 'product_sans_medium',
    fontSize: 16,
  },
  soldNumberText: {
    fontFamily: 'product_sans_regular',
    fontSize: 16,
    color: theme["text-hint-color"]
  },
  soldNumberWrapper: {
    borderColor: theme["border-basic-color-4"],
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: theme["background-basic-color-2"]
  },
  soldNumberItem: {
    paddingHorizontal: 20,
    paddingVertical: 6
  },
});

export default styles;