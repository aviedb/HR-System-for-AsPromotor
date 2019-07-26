import React from 'react';
import { View } from 'react-native';
import theme from '../../styles/theme';

const Divider = (props) => {
  const backgroundColor = props.color || theme["border-basic-color-3"];
  const marginTop = props.marginTop || 0;
  const marginBottom = props.marginBottom || 0;
  const height = props.height || 1;

  return (
    <View style={{ 
      height, 
      backgroundColor,
      marginTop,
      marginBottom
    }}/>
  )
}

export default Divider;