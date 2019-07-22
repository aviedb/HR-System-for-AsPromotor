import React from 'react';
import { View, Text} from 'react-native';

import Touchable from '../Touchable';

import styles from './styles';
import theme from '../../styles/theme';

const Button = (props) => {

  let backgroundColor = theme["text-primary-color"];
  if (props.danger) {
    backgroundColor = theme["text-danger-color"]
  }

  return (
    <Touchable activeOpacity={.9} onPress={props.onPress}>
      <View style={{...styles.container, backgroundColor}}>
        <Text style={styles.text}>
          {props.children || props.title}
        </Text>
      </View>
    </Touchable>
  );
}


export default Button;