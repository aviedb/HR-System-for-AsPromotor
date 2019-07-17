import React, { Component } from 'react';
import { TouchableHighlight as TouchableOpacity } from 'react-native';

import styles from './styles';

const FloatingActionButton = (props) => (
  <TouchableOpacity {...props}>
    {props.children}
  </TouchableOpacity>
);

export default FloatingActionButton;