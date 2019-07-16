import { StyleSheet, Platform, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android'? StatusBar.currentHeight:0,
    backgroundColor: 'white'
  },
  header: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 16,
  },
  container: {
    paddingHorizontal: 40,
    flex: 1
  },
  logo: {
    height: 200,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3267FF',
  },
  logoTitle: {
    color: '#fff',
    fontWeight: 'normal',
    fontFamily: 'product_sans_bold'
  },
  logoSubtitle: {
    color: '#fff',
    fontFamily: 'helvetica_neue_lt'
  },
  input: {
    marginBottom: 8
  },
  forget: {
    marginTop: 16,
    alignSelf: 'flex-end',
    color: '#3267FF'
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 20,
    justifyContent: 'center'
  },
  create: {
    color: '#3267FF',
    fontWeight: 'bold'
  }
});

export default styles;