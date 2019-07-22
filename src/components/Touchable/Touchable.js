import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

const Touchable = (props) => {
  let TouchableComponent = Platform.select({
    android: TouchableNativeFeedback,
    ios: TouchableOpacity
  });

  return (
    <TouchableComponent 
      activeOpacity={.9} 
      {...props}
    />
  );
}

export default Touchable;