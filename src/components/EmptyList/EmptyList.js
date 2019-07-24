import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-ui-kitten';
import Lottie from 'lottie-react-native';

import styles from './styles';

class EmptyList extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.playAnimation) {
      this.emptyAnimation.play(0, 144);
    } else {
      this.emptyAnimation.reset();
      this.emptyAnimation.play(0, 100);
    }
  }

  render() {
    const message = this.props.message || 'Empty List';
    const { playAnimation } = this.props;
    
    return (
      <View style={styles.container}>
        <Lottie 
          ref={animation => {
            this.emptyAnimation = animation;
          }}
          style={styles.lottie}
          loop={playAnimation}
          source={require(`../../assets/animations/empty.json`)}
        />
        <Text style={styles.title}>
          {message}
        </Text>
      </View>
    );
  }
}

export default EmptyList