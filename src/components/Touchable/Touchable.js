import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, Platform } from 'react-native';

const Touchable = (props) => {
  const TouchableComponent = Platform.select({
    android: TouchableNativeFeedback,
    ios: TouchableOpacity
  });
  const activeOpacity = props.activeOpacity || .9;

  return (
    <TouchableComponent 
      activeOpacity={activeOpacity} 
      {...props}
    />
  );
}

export default Touchable;