import React from 'react';
import { View, Text} from 'react-native';

import Touchable from '../Touchable';

import styles from './styles';

const Button = (props) => {
  return (
    <Touchable activeOpacity={.9} onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {props.children || props.title}
        </Text>
      </View>
    </Touchable>
  );
}


export default Button;