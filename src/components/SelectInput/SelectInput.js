import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Select from 'react-native-select-input-ios';

import styles from './styles';

const SelectInput = (props) => {
  return (
    <View style={{...styles.container, ...props.style}}>
      <Text style={styles.title}>
        {props.label}
      </Text>
      <Select
        mode="dropdown"
        value={props.value}
        onSubmitEditing={props.onValueChange}
        style={styles.input}
        options={props.options.map(
          e => { return {
            value: e,
            label: e
          }}
        )}
      />
    </View>
  )
}

export default SelectInput;