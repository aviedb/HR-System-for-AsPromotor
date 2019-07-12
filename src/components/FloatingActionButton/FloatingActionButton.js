import React, { Component } from 'react';
import { TouchableHighlight as TouchableOpacity } from 'react-native';

import styles from './styles';

class FloatingActionButton extends Component {
  render() {
    return (
      <TouchableOpacity {...this.props} style={styles.fab} underlayColor="rgba(50, 103, 255, .7)">
        {this.props.children}
      </TouchableOpacity>
    )
  }
}

export default FloatingActionButton;