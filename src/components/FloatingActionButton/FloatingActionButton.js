import React from 'react';
import { TouchableHighlight } from 'react-native';

import styles from './styles';

const FloatingActionButton = (props) => (
  <TouchableHighlight {...props}>
    {props.children}
  </TouchableHighlight>
);

export default FloatingActionButton;