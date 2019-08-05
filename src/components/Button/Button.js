import React from 'react';
import { View, Text} from 'react-native';

import Touchable from '../Touchable';

import styles from './styles';
import theme from '../../styles/theme';

const Button = (props) => {
  let backgroundColor = 'transparent';
  let color = theme["text-alternate-color"];
  let fontSize = null;
  let fontFamily = null;
  let shadow = null;

  if (props.ghost) {
    if (props.danger) color = theme["text-danger-color"];
    else color = theme["text-primary-color"];
    
    fontSize = 18;
    fontFamily = 'product_sans_medium';
  } else {
    if (props.danger) backgroundColor = theme["text-danger-color"];
    else backgroundColor = theme["text-primary-color"];

    shadow = {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    }
  }

  return (
    <Touchable onPress={props.onPress}>
      <View style={{...styles.container, backgroundColor, ...shadow}}>
        <Text style={{...styles.text, color, fontSize, fontFamily}}>
          {props.children || props.title}
        </Text>
      </View>
    </Touchable>
  );
}


export default Button;