import React from 'react';
import { View } from 'react-native';

const Divider = (props) => {
  const backgroundColor = props.color || '#EAEEF1';
  const marginTop = props.marginTop || 0;
  const marginBottom = props.marginBottom || 0;

  return (
    <View style={{ 
      height: 1, 
      backgroundColor,
      marginTop,
      marginBottom
    }}/>
  )
}

export default Divider;