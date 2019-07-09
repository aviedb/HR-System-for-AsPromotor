import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

const Touchable = Platform.select({
  android: TouchableNativeFeedback,
  ios: TouchableOpacity
});

export default Touchable;