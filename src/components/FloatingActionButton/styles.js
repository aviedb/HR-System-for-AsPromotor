import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent:'center',
    width:48,
    height:48,
    bottom: 16,
    right: 20,
    backgroundColor:'#3267FF',
    borderRadius:100,
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