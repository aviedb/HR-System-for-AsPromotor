import React, { Component } from 'react';
import { View } from 'react-native';

import Touchable from '../Touchable';

import styles from './styles';

class FloatingActionButton extends Component {
  render() {
    return (
      <Touchable {...this.props} style={styles.fab}>
        {this.props.children}
      </Touchable>
    )
  }
}

export default FloatingActionButton;