import React, { Component } from 'react';
import { TouchableHighlight as TouchableOpacity } from 'react-native';

import styles from './styles';

const FloatingActionButton = (props) => (
  <TouchableOpacity {...props} style={styles.fab} underlayColor="rgba(50, 103, 255, .7)">
    {props.children}
  </TouchableOpacity>
);

export default FloatingActionButton;